# -*- coding: utf-8 -*-
import os, sys, urllib2, csv
from django.shortcuts import render_to_response
from django.http import HttpResponse, HttpResponseRedirect
from django.core.context_processors import csrf
from django.db.models import Q
from forms import *
from main.models import *

# helper method
def create_instances(data, attributes, place):
    fields = []
    fields_text = []
    
    for elem in Crime.CRIME_TITLES:
        fields.append(elem[0])
        fields_text.append(elem[1])
    
    for item in data:
        try:
            number = int(item)
            data_title = attributes[data.index(item)]
            index = fields_text.index(data_title)
            
            if index >= 0:
                title = fields[index]
                
                crime = Crime(title = title, number = number, place = place, approved = True)
                crime.save()
        except:
            print 'can"t create instance of crime'
            
def upload(file, place):
    lines = file.readlines()
    
    first_line = False
    attributes = []
    
    for line in lines:
        if not first_line:
            first_line = True
            attributes = line.split(',')
            #print 'attributes:', attributes
        else:
            data = line.split(',')
            
           # print 'row data:', data
            create_instances(data, attributes, place)
    return render_to_response('index.html')

# url handlers

def index(request):
    return render_to_response('index.html')

def site(request):
    url = request.GET.get('url')
    text = urllib2.urlopen(url).read()
    return HttpResponse(src, content_type="text/html; charset=utf-8")

def file(request):
    if request.method == 'POST':
        title = request.POST.get('title')
        place = Place.objects.get(title = title)
        form = UploadFileForm(request.POST, request.FILES)
        if form.is_valid():
            
            upload(request.FILES['file'], place)
            return HttpResponseRedirect('/file')
    else:
        form = UploadFileForm()
    places = Place.objects.all()
    c = {'form': form, 'places': places,}
    c.update(csrf(request))
    return render_to_response('upload.html', c)






