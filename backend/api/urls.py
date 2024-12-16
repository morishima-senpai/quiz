from django.urls import path, include
from rest_framework.authtoken.views import ObtainAuthToken
from .register import register_user
from .views import QuizSessionViewSet
from rest_framework.routers import DefaultRouter



router = DefaultRouter()

router.register(r'sessions/', QuizSessionViewSet, basename='session')


urlpatterns = [
    path('auth/login/', ObtainAuthToken.as_view(), name="login"),
    path('auth/signup/', register_user, name="register"),

    path('api/', include(router.urls)),
]
