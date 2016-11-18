"""Roads URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.10/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url
from django.contrib import admin
from roads import views as roads

urlpatterns = [
    url(r'^index/get_routes_table/$', roads.get_routes_table),
    url(r'^index/add_route/$', roads.add_route),
    url(r'^index/submit/$', roads.registration),
    url(r'^index/authorization/$', roads.authorization),
    url(r'^index/$', roads.index_page),

    url(r'^admin/', admin.site.urls),
]