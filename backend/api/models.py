from django.db import models
import uuid
from django.contrib.auth.models import User

# Create your models here.

class Question(models.Model):
    """
    a quiz question with multiple choice options
    """
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    text = models.TextField()
    difficulty = models.CharField(
        max_length=20, 
        choices=[
            ('easy', 'Easy'), 
            ('medium', 'Medium'), 
            ('hard', 'Hard')
        ],
        default='medium'
    )

    @property
    def options(self):
        return QuestionOption.objects.filter(question=self)

    def __str__(self):
        return self.text[:50]

class QuestionOption(models.Model):
    """
    multiple choice options for a question
    """
    question = models.ForeignKey(Question, related_name='options', on_delete=models.CASCADE)
    text = models.CharField(max_length=255)
    is_correct = models.BooleanField(default=False)

    def __str__(self):
        return self.text

class QuizSession(models.Model):
    """
    keeps track a single quiz session for a user
    """
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='quiz_sessions')
    started_at = models.DateTimeField(auto_now_add=True)
    total_questions = models.IntegerField(default=0)
    correct_answers = models.IntegerField(default=0)
    
    @property
    def score_percentage(self):
        if self.total_questions > 0:
            return round((self.correct_answers / self.total_questions) * 100, 1)
        return 0

    def __str__(self):
        return f"Quiz Session for {self.user.username}"

class QuizAttempt(models.Model):
    """
    keep track of individual question attempts in a quiz session
    """
    session = models.ForeignKey(QuizSession, related_name='attempts', on_delete=models.CASCADE)
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    selected_option = models.ForeignKey(QuestionOption, on_delete=models.CASCADE)
    is_correct = models.BooleanField()
    attempted_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Attempt for {self.question.text} by {self.session.user.username}"