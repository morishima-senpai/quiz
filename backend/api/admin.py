from django.contrib import admin
from .models import Question, QuestionOption, QuizAttempt, QuizSession

# Register your models here.


admin.site.register(Question)
admin.site.register(QuestionOption)
admin.site.register(QuizAttempt)
admin.site.register(QuizSession)