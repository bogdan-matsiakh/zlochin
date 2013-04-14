# Create your views here.
import os
from django.shortcuts import render_to_response
from django.http import HttpResponse
from django.db.models import Q

# -*- coding: utf-8 -*-
from django.template import RequestContext
from django.http import HttpResponseRedirect
from django.core.urlresolvers import reverse

from main.models import Document
from main.forms import DocumentForm

from django.http import HttpResponseRedirect
from django.shortcuts import render
from main.forms import DocumentForm
from main.models import Document

def list(request):
    if request.method == 'POST':
        form = DocumentForm(request.POST, request.FILES)
        if form.is_valid():
            instance = Document(file_field=request.FILES['file'])
            instance.save()
            return HttpResponseRedirect('/')
    else:
        form = DocumentForm()
    return render(request, 'upload.html', {'form': form})

'''

def list(request):
    # Handle file upload
    if request.method == 'POST':
        form = DocumentForm(request.POST, request.FILES)
        if form.is_valid():
            newdoc = Document(docfile = request.FILES['docfile'])
            newdoc.save()

            # Redirect to the document list after POST
            return HttpResponseRedirect(reverse('main.views.list'))
    else:
        form = DocumentForm() # A empty, unbound form

    # Load documents for the list page
    documents = Document.objects.all()

    # Render list page with the documents and the form
    return render_to_response(
        'upload.html',
        {'documents': documents, 'form': form},
        context_instance=RequestContext(request)
    )
'''

def index(request):
    return render_to_response('index.html')


