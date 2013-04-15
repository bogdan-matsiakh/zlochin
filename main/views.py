# -*- coding: utf-8 -*-
import os
import sys
from django.shortcuts import render_to_response
from django.http import HttpResponse, HttpResponseRedirect
from django.db.models import Q
import urllib2


def index(request):
    return render_to_response('index.html')

def site(request):
    url = request.GET.get('url')
    text = urllib2.urlopen(url).read()
    return HttpResponse(src, content_type="text/html; charset=utf-8")
