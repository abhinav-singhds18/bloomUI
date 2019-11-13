from flask import Flask, request
from flask_cors import CORS, cross_origin
from flask_restful import Resource, Api
from flask_jwt import JWT, jwt_required, current_identity

import json
import pyodbc
import pandas as pd

import requests
import subprocess
import csv


# from dataload import dataload

app = Flask(__name__)
app.config['SECRET_KEY'] = 'super-secret'
app.config['CORS_HEADERS'] = 'Content-Type'
api = Api(app, prefix="/api/v1")

CORS(app)

# cors = CORS(app, resources={r"/foo": {"origins": "http://localhost:port"}})

USER_DATA = {
    "admin": "abc123"
}


class User(object):
    def __init__(self, id):
        self.id = id

    def __str__(self):
        return "User(id='%s')" % self.id


def verify(username, password):
    if not (username and password):
        return False
    if USER_DATA.get(username) == password:
        return User(id=123)


def identity(payload):
    user_id = payload['identity']
    return {"user_id": user_id}


jwt = JWT(app, verify, identity)


class PrivateResource(Resource):
    @jwt_required()
    @cross_origin(origin='localhost', headers=['Content- Type', 'Authorization'])
    def post(self):
        #req_data = request.get_json()
        # req_data1 = request.get_json("https://www.quandl.com/api/v3/datasets/WIKI/FB/data.json?api_key=KbNdvy9eQtJKRfyAjdiW")
        # print(req_data1)
        #securities = req_data['database']
        # print(type(securities))
        # print(securities)
        # print(type(req_data))
        # print(req_data)
        # print(subprocess.call('ls -l', shell=True))
        # print(subprocess.call('ls -a', shell=True))
        # subprocess.call('cd /home/abhinav/Projects/amundsen/amundsendatabuilder', shell=True)
        # subprocess.call('source venv/bin/activate', shell=True)
        #subprocess.call(['python3', 'sample_data_loader.py'])
        #subprocess.run('python3 /home/abhinav/Projects/amundsen/amundsendatabuilder/example/scripts/sample_data_loader.py' +
                      # " " + str(securities), shell=True)
        subprocess.run(
            'python3 /home/abhinav/Projects/amundsen/amundsendatabuilder/example/scripts/sample_data_loader.py', shell=True)

        # jugaad()
        # process = subprocess.Popen(['cd /home/abhinav/Projects/amundsen/amundsendatabuilder'], stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        # print(process.communicate())
        #
        # process = subprocess.Popen(['python3 -m venv venv'], stdout=subprocess.PIPE, stderr=subprocess.PIPE, stdin=None)
        #
        # print(process.communicate())
        #
        # process = subprocess.Popen(['python3 example/scripts/sample_data_loader.py'], stdout=subprocess.PIPE)
        #
        # print(process.communicate())
        # http = urllib3.PoolManager()
        # r = http.request('GET', 'https://www.quandl.com/api/v3/datasets/WIKI/FB/data.json?api_key=KbNdvy9eQtJKRfyAjdiW')
        # print(r.data)

        # dataload()
        # return dict(current_identity)
        with open('response.txt') as json_file:
            data = json.load(json_file)
            print(data)
            print(type(data))
            #text = json.dumps(data, sort_keys=True, indent=4)
            # print(text)

        return data


class TestConnection(Resource):

    @cross_origin(origin='localhost', headers=['Content- Type', 'Authorization'])
    def post(self):
        req_data = request.get_json()
        #cursor.execute("INSERT INTO user_data VALUES (%s, %s, %s)", (var1, var2, var3))
        # req_data1 = request.get_json("https://www.quandl.com/api/v3/datasets/WIKI/FB/data.json?api_key=KbNdvy9eQtJKRfyAjdiW")
        # print(req_data1)
        print(req_data)
        print("i am dying")

        
        my_dict = req_data
        csv_file = "Names.csv"
        csv_columns = ['action','Connection_Name','Database_Name','Connection_String','id','Database_Type']
        dict_data = []
        dict_data.append(my_dict)
        csv_file = "Names.csv"
        subprocess.run('python3 /home/abhinav/Projects/amundsen/amundsendatabuilder/example/scripts/sample_data_loader.py', shell=True)

        """ try:
            with open(csv_file, 'w') as csvfile:
                writer = csv.DictWriter(csvfile, fieldnames=csv_columns)
                writer.writeheader()
                for data in dict_data:
                    writer.writerow(data)
        except IOError:
            print("I/O error") 



        try:
            with open(csv_file, 'w') as f:
                for key in my_dict.keys():
                    f.write("%s,%s\n"%(key,my_dict[key]))
        except IOError:
            print("I/O error") """

        with open('response.txt') as json_file:
            #data = json.load(json_file)
            #print(data)
            #print(type(data))
            #text = json.dumps(data, sort_keys=True, indent=4)
            # print(text)

            return 'data'


api.add_resource(PrivateResource, '/private')
api.add_resource(TestConnection, '/testconnection')

if __name__ == '__main__':
    # app.run(debug=True)
    app.run(host="localhost", port=5050, debug=True)