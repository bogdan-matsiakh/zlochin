# -*- coding: utf-8 -*-
import os, sys, urllib2, csv
from django.shortcuts import render_to_response
from django.http import HttpResponse, HttpResponseRedirect
from django.core.context_processors import csrf
from django.core import serializers
from django.utils import simplejson
from django.core.serializers.json import DjangoJSONEncoder, DateTimeAwareJSONEncoder

from main.models import *

# method receive ID of group and send all information about this group
def places(request):
    print request.GET.get('place')
    title = 'Lviv'
    result = {'success':True,  'places':[], 'message':'', 'error': False, }
    places = Place.objects.all()
    
    for place in places:
        result['places'].append({'title': place.title, 'population': place.population, 'area': place.area, })
    
    import simplejson as json
    data = json.dumps(result, cls=DjangoJSONEncoder)
    return HttpResponse(data,mimetype="text/html")

def crimes(request):
    title = request.GET.get('place')
    crime = request.GET.get('crime')
    
    message = ""
    error = False
    
    result = {'success':True,  'crimes':[], 'message':'', 'error': False, }
    if title is None:
        message = "Params 'place' is required"
        error = True
    else:
        place = Place.objects.get(title = title)
    
        crimes = Crime.objects.filter(place = place, approved = True)
        
        for crime in crimes:
            result['crimes'].append({'title': crime.title, 'number': crime.number, 'hour': crime.hour})
    
    result['message'] = message
    result['error'] = error
    
    import simplejson as json
    data = json.dumps(result, cls=DjangoJSONEncoder)
    return HttpResponse(data,mimetype="text/html")