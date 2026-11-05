from django.contrib import admin

# Register your models here.
from django.contrib import admin
from .models import CompanyInfo, Service

admin.site.register(CompanyInfo)
admin.site.register(Service)