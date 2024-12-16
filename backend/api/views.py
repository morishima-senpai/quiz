from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.db.models import Count, Q
from .models import Question, QuizSession, QuizAttempt, QuestionOption
from .serializers import QuestionSerializer, QuizSessionSerializer
from rest_framework.authentication import TokenAuthentication

# Create your views here.



class QuizSessionViewSet(viewsets.ModelViewSet):
    """
    API Viewset to manage quiz sessions for authenticated users
    """
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]
    queryset = QuizSession.objects.all()
    serializer_class = QuizSessionSerializer

    def get_queryset(self):
        # only return quiz sessions for the logged-in user
        return QuizSession.objects.filter(user=self.request.user)

    @action(detail=False, methods=['POST'])
    def start_session(self, request):
        """
        start a new quiz session for the authenticated user and sends a new random question from DB
        """
        
        session = QuizSession.objects.create(user=request.user)
        
        # get a random question not previously answered in this session
        question = Question.objects.annotate(
            option_count=Count('options'),
            attempts_count=Count('quizattempt', filter=Q(quizattempt__session__user=request.user))
        ).filter(
            option_count__gt=1
        ).exclude(
            quizattempt__session__user=request.user
        ).order_by('?').first()

        if not question:
            return Response({
                "error": "out of questions"
            }, status=status.HTTP_404_NOT_FOUND)

        serializer = QuestionSerializer(question)
        return Response({
            "session_id": str(session.id),
            "session_complete" : False,
            "question": serializer.data
        }, status=status.HTTP_201_CREATED)

    @action(detail=True, methods=['POST'])
    def submit_answer(self, request, pk=None):
        """
        submit the answer for a quiz session
        """
        session = self.get_object()
        
        # if the quiz session belongs to the current user
        if session.user != request.user:
            return Response({
                "error": "not permitted"
            },status=status.HTTP_403_FORBIDDEN)

        question_id = request.data.get('question_id')
        option_id = request.data.get('option_id')

        try:
            question = Question.objects.get(id=question_id)
            selected_option = QuestionOption.objects.get(id=option_id)
        except (Question.DoesNotExist, QuestionOption.DoesNotExist):
            return Response({
                "error": "invalid question or option"
            }, status=status.HTTP_400_BAD_REQUEST)

        is_correct = selected_option.is_correct

        QuizAttempt.objects.create(
            session=session,
            question=question,
            selected_option=selected_option,
            is_correct=is_correct
        )

        # update session statistics
        session.total_questions += 1
        session.correct_answers += 1 if is_correct else 0
        session.save()

        # get next random question
        next_question = Question.objects.annotate(
            attempts_count=Count('quizattempt', 
                filter=models.Q(quizattempt__session__user=request.user))
        ).exclude(
            quizattempt__session__user=request.user
        ).order_by('?').first()

        # if no more questions left, return session summary
        if not next_question:
            return Response({
                "session_id" : pk,
                "session_complete": True,
                "is_correct": is_correct,
                "total_questions": session.total_questions,
                "correct_answers": session.correct_answers,
                "score_percentage": session.score_percentage
            }, status=status.HTTP_200_OK)

        next_question_serializer = QuestionSerializer(next_question)
        return Response({
            "session_id" : pk,
            "session_complete" : False,
            "is_correct": is_correct,
            "question": next_question_serializer.data
        }, status=status.HTTP_200_OK)

