# -*- coding: utf-8 -*-
from django.db import models
from django.contrib import admin

class Place(models.Model):
    title = models.CharField(max_length = 50)
    population = models.IntegerField()
    area = models.IntegerField()
    
    def __unicode__(self):
        return self.title

class Crime(models.Model):
    CRIME_TITLES = (
        ('time', 'ЧАС'),
        ('total', 'ВСЬОГО'),
        ('hard_vhard', 'ТЯЖКІ ТА О.ТЯЖКІ'),
        ('killing', 'ВБИВСТВО'),
        ('intentional_hard', 'УМИСНЕ ТЯЖ ТІЛ УШКОДЖЕННЯ'),
        ('hard_with_dead', 'ТЯЖ ТІЛ УШКОДЖ ЗІ СМЕРТ. НАСЛ.'),
        ('rape', 'ЗГВАЛТУВАННЯ'),
        ('robbery', 'КРАДІЖКА'),
        ('looting', 'ГРАБІЖ'),
        ('brigandage', 'РОЗБІЙ'),
        ('chantage', 'ВИМАГАННЯ'),
        ('fraud', 'ШАХРАЙСТВО'),
        ('car_robbery', 'ЗАВОЛОД Т/З'),
        ('hooliganism', 'ХУЛІГАНСТВО'),
    )
    title = models.CharField(max_length = 20, choices = CRIME_TITLES)
    number = models.IntegerField()
    place = models.ForeignKey(Place, verbose_name="place of crime")
    approved = models.BooleanField(default = False)
    
    def __unicode__(self):
        return u'%s %s' % (self.place.title, self.title)

admin.site.register(Place)
admin.site.register(Crime)