from django.urls import path, include
from rest_framework.authtoken.views import ObtainAuthToken
from .register import register_user
from .views import QuizSessionViewSet, QuizStatisticsView
from rest_framework.routers import DefaultRouter



router = DefaultRouter()

router.register(r'sessions', QuizSessionViewSet, basename='session')
router.register(r'stats', QuizStatisticsView, basename='statistics')

urlpatterns = [
    path('auth/login/', ObtainAuthToken.as_view(), name="login"),
    path('auth/signup/', register_user, name="register"),

    path('', include(router.urls)),
]
