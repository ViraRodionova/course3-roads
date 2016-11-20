import MySQLdb as myDB
from models import *
from my_mongo import dbMongo

class DBMySQL:
    # def __init__(self):
        # self.conn = myDB.connect('localhost', 'root', '1111', 'roads')
        # self.conn = myDB.connect('sql7.freemysqlhosting.net', 'sql7145233', 'DtLZZNWVvx', 'sql7145233')
        # self.connect()

    def registration(self, email, password, name, city, attrib):
        # self.connect()
        users = User.objects.filter(id_email=email)

        if not users:
            mongo_id = dbMongo.insertUser(name, city, attrib)
            User.objects.create(id_email=email, password=password, mongo_id=mongo_id)
            # self.disconnect()
            return {'message': "You're succesfully registated", 'status': True, 'user': str(mongo_id)}
        # self.disconnect()
        return {'message': "User with email '" + email + "' has already exist", 'status': False}

    def authorization(self, email, password):
        # self.connect()
        user = User.objects.filter(id_email=email, password=password)
        # self.disconnect()
        if not user:
            return {'message': "No registrated users with email '" + email + "'", 'status': False}
        return {'message': "You're signed in as '" + email + "'", 'status': True, 'user': user[0].mongo_id}

    def showUsers(self):
        # self.connect()
        users = User.objects.filter()
        # self.disconnect()
        for u in users:
            print u

    def connect(self):
        self.conn = myDB.connect('sql7.freemysqlhosting.net', 'sql7145233', 'DtLZZNWVvx', 'sql7145233')

    def disconnect(self):
        self.conn.close()

dbMySQL = DBMySQL()