from __future__ import unicode_literals

from django.db import models

# Create your models here.
class User(models.Model):
    id_email = models.CharField(max_length=50, primary_key=True)
    password = models.CharField(max_length=50)
    mongo_id = models.CharField(max_length=50)

    def __unicode__(self):
        return "{0}\t{1}".format(self.id_email, self.mongo_id)

def UserMongo(name, city, attrib):
    return {
        "name": name,
        "main-city": {
            "name": city,
            "lat": attrib[0],
            "lng": attrib[1]
        },
        "routes": []
    }

def RouteMongo(obj, addr):
    return {
        "address": {
            "start": addr['addr_start'],
            "end": addr['addr_end']
        },
        "start": [float(obj['start'][0]), float(obj['start'][1])],
        "end": [float(obj['end'][0]), float(obj['end'][1])],
        "polyline": obj['polyline']
    }