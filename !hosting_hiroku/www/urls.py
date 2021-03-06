from django.conf.urls import patterns, include, url

# Uncomment the next two lines to enable the admin:
from django.contrib import admin
admin.autodiscover()

from main import views
from api import views

from django.conf.urls import patterns, include, url
from django.conf import settings
from django.conf.urls.static import static
#from django.views.generic.simple import redirect_to


urlpatterns = patterns('',
    url(r'^site/$', 'main.views.site'),
  #  url(r'^list/$', 'main.views.list'),
    url(r'^$', 'main.views.index'),
    url(r'^upload$', 'main.views.upload'),
    url(r'^file$', 'main.views.file'),
    
     # Uncomment the admin/doc line below to enable admin documentation:
    url(r'^admin/doc/', include('django.contrib.admindocs.urls')),

    # Uncomment the next line to enable the admin:
    url(r'^admin/', include(admin.site.urls)),
    
    # API
    url(r'^api/places$', 'api.views.places'),
    url(r'^api/crimes$', 'api.views.crimes'),
)

'''
urlpatterns = patterns('',
    url(r'^list/$', 'main.views.list'),
    # Examples:
    # url(r'^$', 'zlochin.views.home', name='home'),
    # url(r'^zlochin/', include('zlochin.foo.urls')),

   
    
    url(r'^$', 'main.views.index'),
    
    
)
'''
