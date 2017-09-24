from flask import Flask, render_template, jsonify, request
import sys,os
import json
import configparser
import sqlite3

app = Flask(__name__,static_url_path='')

class database:
    def get_connection():
        path = os.path.dirname(os.path.abspath(__file__))
        dbname = path+'/database/database.db'
        conn = sqlite3.connect(dbname)
        conn.row_factory = sqlite3.Row
        cursor = conn.cursor()
        return conn,cursor

    def get_recent(cursor,main_target):
        sql = "select * from leaderboard where main_target = ?"
        cursor.execute(sql, [main_target])
        res = cursor.fetchall()
        return res

    def get_recent_target(cursor):
        sql = "SELECT id,main_target from leaderboard ORDER BY id DESC limit 1;"
        cursor.execute(sql)
        res = cursor.fetchone()
        return res

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
    main_target = res[1]
    res = database.get_recent(cursor,main_target)
    print(res)
    response = jsonify(data=res,focus_target=main_target)
    response.status_code = 200
    return response

if __name__ == '__main__':
    app.run(debug=True,host='0.0.0.0')
