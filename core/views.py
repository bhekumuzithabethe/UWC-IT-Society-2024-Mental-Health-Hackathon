from django.shortcuts import render,redirect
from django.http import JsonResponse
import google.generativeai as genai
import random
import pywhatkit
import pyttsx3

from django.conf import settings
genai.configure(api_key=settings.GEMIN_AI_API_KEY)

def ask_geminai(message):
    model = genai.GenerativeModel("gemini-1.5-flash")
    response = model.generate_content(message)
    
    response_text = response.candidates[0].content.parts[0].text
    answer = response_text.replace("*"," ")
    return answer
    

engine = pyttsx3.init()
voices = engine.getProperty('voices')
engine.setProperty('voice', voices[1].id)
engine.setProperty('rate', 145)

def chatbot(request):
    
    if request.method == 'POST':
        message = request.POST.get('message')
        response = ask_geminai(message)        
        engine.say(response)
        engine.runAndWait()
        return JsonResponse({'message': message, 'response': response }), redirect('chatbot')
    else:
        
        return render(request, 'core/chatbot.html',{})

def task_management(request):
    return render(request,"core/todo.html",{})

def meditation(request):
    sound_list = [
        'Pure Clean Positive Energy Vibration" Meditation Music, Healing Music, Relax Mind Body & Soul',
        'Boost Your Aura" Attract Positive Energy Meditation Music, 7 Chakra Balancing & Healing',
    ] 
    pywhatkit.playonyt(random.choice(sound_list))
    return redirect('home')
