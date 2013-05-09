# -*- coding: utf-8 -*-
import os, sys, urllib2, csv
from django.shortcuts import render_to_response
from django.http import HttpResponse, HttpResponseRedirect
from django.core.context_processors import csrf
from django.db.models import Q
from forms import *

def index(request):
    return render_to_response('index.html')

def site(request):
    url = request.GET.get('url')
    text = urllib2.urlopen(url).read()
    return HttpResponse(src, content_type="text/html; charset=utf-8")

def file(request):
    if request.method == 'POST':
        a=request.POST
        form = UploadFileForm(request.POST, request.FILES)
        if form.is_valid():
            
            print 'file'
            print request.FILES['file']
            
            upload(request.FILES['file'])
            return HttpResponseRedirect('/file')
    else:
        form = UploadFileForm()

    c = {'form': form}
    c.update(csrf(request))
    return render_to_response('upload.html', c)


def upload(file):
    print 'file'
    print file
    lines = file.readlines()
    
    first_line = False
    attributes = []
    
    for line in lines:
        if not first_line:
            first_line = True
            attributes = line
            print 'attributes:', attributes
        else:
            print 'row:', line
    return render_to_response('index.html')