# -*- coding: utf-8 -*-
import os
import sys
#import xlrd
from django.shortcuts import render_to_response
from django.http import HttpResponse, HttpResponseRedirect
from django.db.models import Q
from django.template import RequestContext
from main.models import Document
#from main.forms import UploadFileForm
import urllib2

from django.shortcuts import render_to_response
from django.template import RequestContext
from django.http import HttpResponseRedirect
from django.core.urlresolvers import reverse

from main.models import Document
from main.forms import DocumentForm

from django.core.files.storage import default_storage
from django.core.files.base import ContentFile
from django.conf import settings


def list(request):
  #  print xlrd
    if request.method == 'POST':
        form = DocumentForm(request.POST, request.FILES)
        
        if form.is_valid():
            file = request.FILES['docfile']
            print type(file)
            lines = file.readlines()
            '''
            workbook = xlrd.open_workbook()
            for line in lines:
                print line
                '''
            return HttpResponseRedirect('/list')
    else:
        form = DocumentForm() # A empty, unbound form

    documents = Document.objects.all()

    return render_to_response(
        'list.html',
        {'documents': documents, 'form': form},
        context_instance=RequestContext(request)
    )

def index(request):
    return render_to_response('index.html')

def site(request):
    #url = request.POST.get('url')
    #template = request.POST.get('template')
    url = 'https://www.google.com/fusiontables/embedviz?viz=MAP&q=select+col210+from+1JLNhoP4rNdnGHk6UTGeVAqkivHdfSfckO-PaN8I&h=false&lat=48.53600159335156&lng=31.17925930023216&z=5&t=1&l=col210&y=6&tmplt=7'
    template = 'googft-legend'
    lines = urllib2.urlopen(url).readlines()
    print lines
    text = ''
    if template:
        for line in lines:
            text += line
    return HttpResponse(text, content_type="text/html; charset=utf-8")
