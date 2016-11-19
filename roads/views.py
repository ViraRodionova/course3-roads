from django.shortcuts import render_to_response
from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt
from my_mySql import dbMySQL
from my_mongo import dbMongo
import json

# Create your views here.
def index_page(request):
    # dbMongo.reset()
    return render_to_response("index.html")

def showMySQL(request):
    dbMySQL.showUsers()
    return HttpResponse('Users')

@csrf_exempt
def registration(request):
    message = {"message": "Fail", "status": False}
    if request.method == 'POST':
        name = request.POST.__getitem__('reg-name')
        email = request.POST.__getitem__('reg-email')
        password = request.POST.__getitem__('password')
        city = request.POST.__getitem__('reg-city')
        attrib = request.POST.__getitem__('reg-city-attrib').split(';')

        message = dbMySQL.registration(email, password, name, city, attrib)
    return JsonResponse(message)

@csrf_exempt
def authorization(request):
    message = {"message": "Fail", "status": False}
    if request.method == 'POST':
        email = request.POST.__getitem__('reg-email')
        password = request.POST.__getitem__('password')

        message = dbMySQL.authorization(email, password)
    return JsonResponse(message)

@csrf_exempt
def add_route(request):
    if request.method == 'POST':
        name = request.POST.__getitem__('ddd')
        route = json.loads(name)

        print route['result']

        dbMongo.insertRoute(route)

    return JsonResponse({})

@csrf_exempt
def get_routes_table(request):
    routes = []
    if request.method == 'POST':
        user_id = request.POST.__getitem__('user_id')
        routes = dbMongo.get_routes_by_id(user_id)

    return JsonResponse({"result": routes})