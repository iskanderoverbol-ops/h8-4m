from django.shortcuts import render
from .models import Service

def services_view(request):
    if request.method == 'POST':
        some_value = request.POST.get('field_name')

    services = Service.objects.all()
    return render(request, 'services.html', {'services': services})