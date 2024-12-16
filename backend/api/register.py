from rest_framework.authtoken.models import Token
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from django.contrib.auth.models import User



@api_view(['POST'])
@permission_classes([AllowAny])
def register_user(request):
    """
    gegister a new user and generate an authentication token
    """
    username = request.data.get('username')
    password = request.data.get('password')

    if not username or not password:
        return Response({
            "error": "username and password are required"
        }, status=status.HTTP_400_BAD_REQUEST)

    try:

        if User.objects.filter(username=username).exists():
            return Response({
                "error": "username already exists"
            }, status=status.HTTP_400_BAD_REQUEST)

        
        user = User.objects.create_user(username=username,password=password)

        # generate token for the user
        token, _ = Token.objects.get_or_create(user=user)

        return Response({
            "user_id": str(user.id),
            "username": user.username,
            "token": token.key
        }, status=status.HTTP_201_CREATED)

    except Exception as err:
        return Response({
            "error": "something went wrong"
        },status=status.HTTP_500_INTERNAL_SERVER_ERROR)