from flask import Flask, render_template, jsonify, request
import sys,os
import json
import configparser

app = Flask(__name__,static_url_path='')

@app.route('/machine-case', methods=['GET'])
def return_history():
    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True,host='0.0.0.0')
