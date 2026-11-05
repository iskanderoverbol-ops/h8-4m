from django.db import models

# Create your models here.

class CompanyInfo(models.Model):
  name = models.CharField(max_length=255, verbose_name="Название компании")
  description = models.TextField(verbose_name="Описание")
  logo = models.ImageField(upload_to="company/", verbose_name="Логотип")
  phone = models.CharField(max_length=50, verbose_name="Номер телефона")
  email = models.EmailField(verbose_name="Email")
  address = models.CharField(max_length=255, verbose_name="Адрес")
  instagram = models.URLField(blank=True, null=True, verbose_name="Instagram")
  telegram = models.URLField(blank=True, null=True, verbose_name="Telegram")
  whatsapp = models.URLField(blank=True, null=True, verbose_name="WhatsApp")
  youtube = models.URLField(blank=True, null=True, verbose_name="YouTube")

  class Meta:
    verbose_name = "Информация о компании"
    verbose_name_plural = "Информация о компании"

  def __str__(self):
    return self.name


class Service(models.Model):
  title = models.CharField(max_length=255, verbose_name="Название услуги")
  description = models.TextField(verbose_name="Описание")
  price = models.DecimalField(max_digits=10, decimal_places=2, verbose_name="Цена")
  image = models.ImageField(upload_to="services/", verbose_name="Изображение")

  class Meta:
    verbose_name = "Услуга"
    verbose_name_plural = "Услуги"

  def __str__(self):
    return self.title