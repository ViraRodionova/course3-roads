from pymongo import MongoClient
from bson.objectid import ObjectId
import models

class DBMongo:
    def __init__(self):
        self.client = MongoClient('mongodb://bepa.rdnv:coursework3@ds029565.mlab.com:29565/roads')
        self.db = self.client['roads']
        self.user = self.db['user']
        self.route = self.db['route']
        # self.way = self.db['way']
        # self.conformity = self.db['conformity']

    def insertUser(self, name, city, attrib):
        return self.user.insert_one(models.UserMongo(name, city, attrib)).inserted_id

    def insertRoute(self, request):
        route_id = self.route.insert_one(models.RouteMongo(request['result'], request['address'])).inserted_id

        self.user.find_one_and_update({"_id": ObjectId(request['user'])}, {"$push": {"routes": route_id}})
        return

    def reset(self):
        self.user.delete_many({})

    def get_routes_by_id(self, user_id):
        user = self.user.find_one({"_id": ObjectId(user_id)})
        print user

        result = []

        for r in user['routes']:
            result.append(self.route.find_one({"_id": r}))

        for r in result:
            r["_id"] = str(r["_id"])

        print result
        return result


dbMongo = DBMongo()