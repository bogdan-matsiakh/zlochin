# -*- coding: utf-8 -*-
import os
import sys
import xlrd
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
    print xlrd
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

def handle_uploaded_file(f):
    with open(f, 'wb+') as destination:
        for chunk in f.chunks():
            destination.write(chunk)

def index(request):
    return render_to_response('index.html')

def site(request):
    url = request.GET.get('url')
    text = urllib2.urlopen(url).read()
    return HttpResponse(text, content_type="text/html; charset=utf-8")
