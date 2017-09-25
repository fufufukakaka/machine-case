from flask import Flask, render_template, jsonify, request
import sys,os
import json
import configparser
import sqlite3

app = Flask(__name__,static_url_path='')

class database:
    def dict_factory(cursor, row):
        d = {}
        for idx, col in enumerate(cursor.description):
            d[col[0]] = row[idx]
        return d

    def get_connection():
        path = os.path.dirname(os.path.abspath(__file__))
        dbname = path+'/database/database.db'
        conn = sqlite3.connect(dbname)
        conn.row_factory = database.dict_factory
        cursor = conn.cursor()
        return conn,cursor

    def get_recent(cursor,main_target):
        sql = "select * from leaderboard as l inner join model_detail as m on l.id = m.submission_id where main_target = ? order by auc desc;"
        cursor.execute(sql, [main_target])
        res = cursor.fetchall()
        return res

    def get_sub_target(cursor,main_target):
        sql = "select sub_target from leaderboard where main_target = ?"
        cursor.execute(sql, [main_target])
        res = cursor.fetchall()
        sub_target_list = []
        for i in res:
            sub_target_list.append(i["sub_target"])
        #重複を削除
        sub_target_list = list(set(sub_target_list))
        return sub_target_list

    def get_main_target(cursor):
        sql = "select main_target from leaderboard"
        cursor.execute(sql)
        res = cursor.fetchall()
        main_target_list = []
        for i in res:
            main_target_list.append(i["main_target"])
        #重複を削除
        main_target_list = list(set(main_target_list))
        return main_target_list

    def get_recent_target(cursor):
        sql = "SELECT id,main_target from leaderboard order by id desc limit 1;"
        cursor.execute(sql)
        res = cursor.fetchone()
        return res

    def get_confusion_matrix(cursor,target_id):
        sql = "select * from confusion_matrix where submission_id = ?"
        cursor.execute(sql,[target_id])
        res = cursor.fetchall()
        #クラスの配列と中に入る値の配列に分ける
        class_array=[]
        value_array=[]
        for row in res:
            class_array.append(row["row_class"])
            value_array.append(row["value"])
        #重複を削除
        li_uniq = []
        for x in class_array:
            if x not in li_uniq:
                li_uniq.append(x)
        return li_uniq,value_array

@app.route('/machine-case', methods=['GET'])
def return_history():
    return render_template('index.html')

@app.route('/machine-case/hello', methods=['GET'])
def return_hello():
    response = jsonify(data="Hello")
    response.status_code = 200
    return response

@app.route('/machine-case/getRecent', methods=['GET'])
def return_recent():
    connection,cursor = database.get_connection()
    res = database.get_recent_target(cursor)
    main_target = res["main_target"]
    res = database.get_recent(cursor,main_target)
    main_targets = database.get_main_target(cursor)
    sub_targets = database.get_sub_target(cursor,main_target)
    response = jsonify(data=res,focusTarget=main_target,subTargetList=sub_targets,mainTargetList=main_targets)
    response.status_code = 200
    return response

@app.route('/machine-case/getTarget', methods=['POST'])
def return_target():
    connection,cursor = database.get_connection()
    data = request.get_json()
    main_target = data['next']

    sub_targets = database.get_sub_target(cursor,main_target)
    res = database.get_recent(cursor,main_target)
    response = jsonify(data=res,focusTarget=main_target,subTargetList=sub_targets)
    response.status_code = 200
    return response

@app.route('/machine-case/getConfusionMatrix',methods=['POST'])
def return_matrix():
    connection,cursor = database.get_connection()
    data = request.get_json()
    target_id = data['target_id']
    class_array,value_array = database.get_confusion_matrix(cursor,target_id)
    response = jsonify(class_array=class_array,value_array=value_array)
    response.status_code = 200
    return response

if __name__ == '__main__':
    app.run(debug=True,host='0.0.0.0')
