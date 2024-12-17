from rest_framework.authtoken.models import Token
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from django.contrib.auth.models import User
import logging


logger = logging.getLogger(__name__)


@api_view(['POST'])
@permission_classes([AllowAny])
def register_user(request):
    """
    gegister a new user and generate an authentication token
    """
    try:
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
            logger.error("User account acreation failed :", err)
            return Response({
                "error": "something went wrong"
            },status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    except Exception as err:
        logger.error("Registration Failed :", err)
        return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    



@api_view(['POST'])
def logout_user(request):
    """
    logout user by deleting their authentication token
    """
    try:
        # get user's token from request header
        auth_header = request.headers.get('Authorization')
        if not auth_header or not auth_header.startswith('Token '):
            return Response({
                "error": "Invalid authorization header"
            }, status=status.HTTP_400_BAD_REQUEST)
        
        token_key = auth_header.split(' ')[1]
        
        try:
            # find and delete the token
            token = Token.objects.get(key=token_key)
            token.delete()
            
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Token.DoesNotExist:
            return Response({
                "error": "Invalid token"
            }, status=status.HTTP_400_BAD_REQUEST)
        except Exception as err:
            logger.error(f"Error during logout: {err}")
            return Response({
                "error": "Something went wrong during logout"
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    except Exception as err:
        logger.error(f"Error processing logout request: {err}")
        return Response({
            "error": "Failed to process logout request"
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
