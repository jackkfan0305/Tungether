# Generated by Django 4.2.7 on 2023-12-30 00:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('spotify', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='spotifytoken',
            name='access_token',
        ),
        migrations.AddField(
            model_name='spotifytoken',
            name='access_token',
            field=models.CharField(null=True, max_length=150, default=''),
        ),
        migrations.AlterField(
            model_name='spotifytoken',
            name='refresh_token',
            field=models.CharField(null=True, max_length=15, default=''),
        ),
        migrations.AlterField(
            model_name='spotifytoken',
            name='token_type',
            field=models.CharField(null=True, max_length=50, default=''),
        ),
    ]