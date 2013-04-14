# Create your views here.
import os
from django.shortcuts import render_to_response
from django.http import HttpResponse
from django.db.models import Q

def index(request):
    return render_to_response('index.html')