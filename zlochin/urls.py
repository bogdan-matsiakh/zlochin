from django.conf.urls import patterns, include, url

# Uncomment the next two lines to enable the admin:
from django.contrib import admin
admin.autodiscover()

from main import views

from django.conf.urls import patterns, include, url
from django.conf import settings
from django.conf.urls.static import static
from django.views.generic.simple import redirect_to


urlpatterns = patterns('main.views',
    url(r'^list/$', 'list', name='list'),
     url(r'^$', 'index', name='index'),
)

'''
urlpatterns = patterns('',
    url(r'^list/$', 'main.views.list'),
    # Examples:
    # url(r'^$', 'zlochin.views.home', name='home'),
    # url(r'^zlochin/', include('zlochin.foo.urls')),

    # Uncomment the admin/doc line below to enable admin documentation:
    url(r'^admin/doc/', include('django.contrib.admindocs.urls')),

    # Uncomment the next line to enable the admin:
    url(r'^admin/', include(admin.site.urls)),
    
    url(r'^$', 'main.views.index'),
    
    url(r'^site/$', 'main.views.site'),
)
'''
