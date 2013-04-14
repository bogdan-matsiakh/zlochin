# -*- coding: utf-8 -*-
from django.db import models
from django.contrib import admin

class Document(models.Model):
    docfile = models.FileField(upload_to='documents/%Y')
    
admin.site.register(Document)