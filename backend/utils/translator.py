import os
from moviepy.editor import VideoFileClip
import speech_recognition as sr
from gtts import gTTS
from googletrans import Translator
import tempfile
import uuid
# from cassandra.cluster import Cluster
# from cassandra.auth import PlainTextAuthProvider
# import json



# Configuration for DataStax (Cassandra)
# CASSANDRA_IP = 'your-cassandra-cluster-ip'  # Replace with your cluster IP
# CASSANDRA_KEYSPACE = 'your_datastax_keyspace'  # Replace with your keyspace
# CASSANDRA_TABLE = 'your_datastax_table'  # Replace with your table name
# CASSANDRA_USERNAME = 'your_username'  # Replace with your username
# CASSANDRA_PASSWORD = 'your_password'  # Replace with your password

# cloud_config= {
#   'secure_connect_bundle': 'secure-connect-translate.zip'
# }

# Supported languages
INDIAN_LANGUAGES = {
    'Hindi': 'hi',
    'Marathi': 'mr',
    'Gujarati': 'gu',
    'Tamil': 'ta',
    'Kannada': 'kn',
    'Telugu': 'te',
    'Bengali': 'bn',
    'Malayalam': 'ml',
    'Punjabi': 'pa',
    'Odia': 'or'
}

# Process video file
def process_video(video_file, source_language):
    session_id = str(uuid.uuid4())
    audio_path = convert_video_to_audio(video_file)
    if not audio_path:
        raise Exception("Failed to convert video to audio")
    
    try:
        # Transcribe audio to English
        english_text = transcribe_audio_to_english(audio_path, source_language)
        if not english_text:
            raise Exception("Failed to transcribe audio")
        
        # Generate translations and audio files
        translations = {}
        for lang_name, lang_code in INDIAN_LANGUAGES.items():
            translated_text = translate_text(english_text, lang_code)
            if translated_text:
                audio_filename = f"{session_id}_{lang_code}.mp3"
                audio_path = create_audio_file(translated_text, lang_code, audio_filename)
                translations[lang_name] = {
                    'text': translated_text,
                    'audio_url': f'/api/audio/{audio_filename}'
                }
        
        return {
            'english_text': english_text,
            'translations': translations
        }
    finally:
        # Cleanup
        if audio_path and os.path.exists(audio_path):
            os.remove(audio_path)

# Convert video to audio
def convert_video_to_audio(video_file):
    try:
        temp_video = tempfile.mktemp(suffix='.mp4')
        video_file.save(temp_video)
        
        video = VideoFileClip(temp_video)
        audio_path = tempfile.mktemp(suffix='.wav')
        video.audio.write_audiofile(audio_path)
        
        video.close()
        os.remove(temp_video)
        
        return audio_path
    except Exception as e:
        print(f"Error converting video to audio: {str(e)}")
        return None

# Transcribe audio
def transcribe_audio_to_english(audio_path, source_language):
    try:
        recognizer = sr.Recognizer()
        with sr.AudioFile(audio_path) as source:
            audio = recognizer.record(source)
        text = recognizer.recognize_google(audio, language=source_language)
        
        if source_language != 'en-US':
            translator = Translator()
            translation = translator.translate(text, dest='en')
            return translation.text
        return text
    except Exception as e:
        print(f"Error in transcription: {str(e)}")
        return None

# Translate text
def translate_text(text, target_language):
    try:
        translator = Translator()
        translation = translator.translate(text, dest=target_language)
        return translation.text
    except Exception as e:
        print(f"Error translating text: {str(e)}")
        return None

# Create audio file from text
def create_audio_file(text, language_code, filename):
    try:
        output_path = os.path.join('temp', filename)
        tts = gTTS(text=text, lang=language_code, slow=False)
        tts.save(output_path)
        return output_path
    except Exception as e:
        print(f"Error creating audio file: {str(e)}")
        return None


############################################################################################
# import os
# import uuid
# import requests
# from moviepy.editor import VideoFileClip
# import speech_recognition as sr
# from gtts import gTTS
# from googletrans import Translator
# import tempfile

# # Set up connection details
# ASTRA_DB_API_ENDPOINT = "https://991b0d3b-9ff6-4122-8be8-aeea742bed6e-us-east-2.apps.astra.datastax.com"
# ASTRA_DB_KEYSPACE = "multilingual_blog"
# ASTRA_API_TOKEN = "AstraCS:sxFiUbafSxslhkceUjIvcEuB:bcb8e3c55004ce2e9496b3caacc82ed58489cce8847481097f4dec3fc59785cf"  # Replace with your actual token or load it securely

# # Define headers for authentication
# headers = {
#     "X-Cassandra-Token": ASTRA_API_TOKEN,  # Correct token header
#     "Content-Type": "application/json"
# }

# # Function to send POST requests
# def send_post_request(url, data):
#     response = requests.post(url, headers=headers, json=data)
#     return response.json()  # Return the response in JSON format

# # Generate a UUID
# def generate_uuid():
#     return str(uuid.uuid4())  # Generates a random UUID

# # Insert data into the 'users' table
# def insert_user(user_id, username, email, password_hash, created_at):
#     url = f"{ASTRA_DB_API_ENDPOINT}/api/rest/v2/keyspaces/{ASTRA_DB_KEYSPACE}/users"
#     data = {
#         "user_id": user_id,
#         "username": username,
#         "email": email,
#         "password_hash": password_hash,
#         "created_at": created_at,
#     }
#     response = send_post_request(url, data)
#     print("User Insert Response:", response)


# # Insert data into the 'media_uploads' table
# def insert_media_upload(upload_id, user_id, file_name, file_type, upload_path, upload_date, status):
#     url = f"{ASTRA_DB_API_ENDPOINT}/api/rest/v2/keyspaces/{ASTRA_DB_KEYSPACE}/media_uploads"
#     data = {
#         "upload_id": upload_id,
#         "user_id": user_id,
#         "file_name": file_name,
#         "file_type": file_type,
#         "upload_path": upload_path,
#         "upload_date": upload_date,
#         "status": status,
#     }
#     response = send_post_request(url, data)
#     print("Media Upload Insert Response:", response)


# # Insert data into the 'transcriptions' table
# def insert_transcription(transcription_id, upload_id, transcription_text, language, edited, created_at):
#     url = f"{ASTRA_DB_API_ENDPOINT}/api/rest/v2/keyspaces/{ASTRA_DB_KEYSPACE}/transcriptions"
#     data = {
#         "transcription_id": transcription_id,
#         "upload_id": upload_id,
#         "transcription_text": transcription_text,
#         "language": language,
#         "edited": edited,
#         "created_at": created_at
#     }
#     response = send_post_request(url, data)
#     print("Transcription Insert Response:", response)


# # Insert data into the 'translations' table
# def insert_translation(transcription_id, language_code, translated_text, accuracy_metric):
#     url = f"{ASTRA_DB_API_ENDPOINT}/api/rest/v2/keyspaces/{ASTRA_DB_KEYSPACE}/translations"
#     data = {
#         "translation_id": generate_uuid(),  # Generate new UUID for each translation
#         "transcription_id": transcription_id,
#         "language_code": language_code,
#         "translated_text": translated_text,
#         "accuracy_metric": accuracy_metric
#     }
#     response = send_post_request(url, data)
#     print("Translation Insert Response:", response)


# # Insert data into the 'blogs' table
# def insert_blog(blog_id, user_id, title, description, created_at, category, tags, default_language, status):
#     url = f"{ASTRA_DB_API_ENDPOINT}/api/rest/v2/keyspaces/{ASTRA_DB_KEYSPACE}/blogs"
#     data = {
#         "blog_id": blog_id,
#         "user_id": user_id,
#         "title": title,
#         "description": description,
#         "created_at": created_at,
#         "category": category,
#         "tags": tags,
#         "default_language": default_language,
#         "status": status
#     }
#     response = send_post_request(url, data)
#     print("Blog Insert Response:", response)


# # Insert data into the 'blog_translations' table
# def insert_blog_translation(blog_translation_id, blog_id, language_code, translated_title, translated_content, seo_url):
#     url = f"{ASTRA_DB_API_ENDPOINT}/api/rest/v2/keyspaces/{ASTRA_DB_KEYSPACE}/blog_translations"
#     data = {
#         "blog_translation_id": blog_translation_id,
#         "blog_id": blog_id,
#         "language_code": language_code,
#         "translated_title": translated_title,
#         "translated_content": translated_content,
#         "seo_url": seo_url
#     }
#     response = send_post_request(url, data)
#     print("Blog Translation Insert Response:", response)


# # Insert data into the 'blog_analytics' table
# def insert_blog_analytics(blog_id, language_code, views, engagement_metrics):
#     url = f"{ASTRA_DB_API_ENDPOINT}/api/rest/v2/keyspaces/{ASTRA_DB_KEYSPACE}/blog_analytics"
#     data = {
#         "blog_id": blog_id,
#         "language_code": language_code,
#         "views": views,
#         "engagement_metrics": engagement_metrics
#     }
#     response = send_post_request(url, data)
#     print("Blog Analytics Insert Response:", response)


# # Example Usage
# if __name__ == "__main__":
#     # Insert a user
#     insert_user(generate_uuid(), "johndoe", "johndoe@example.com", "hashed_password", "2025-01-01T10:00:00Z")

#     # Insert a media upload
#     insert_media_upload(generate_uuid(), generate_uuid(), "video.mp4", "video", "/uploads/video.mp4", "2025-01-02T12:00:00Z", "uploaded")

#     # Insert a transcription
#     insert_transcription(generate_uuid(), generate_uuid(), "Transcription text here", "en", False, "2025-01-03T14:00:00Z")

#     # Insert a translation
#     transcription_id = generate_uuid()
#     insert_translation(transcription_id, "es", "Texto traducido aquí", {"BLEU": 0.85})

#     # Insert a blog
#     insert_blog(generate_uuid(), generate_uuid(), "My First Blog", "This is the description.", "2025-01-04T16:00:00Z", "Technology", ["AI", "ML"], "en", "draft")

#     # Insert a blog translation
#     insert_blog_translation(generate_uuid(), generate_uuid(), "es", "Mi primer blog", "Esta es la descripción traducida.", "/mi-primer-blog")

#     # Insert blog analytics
#     insert_blog_analytics(generate_uuid(), "en", 100, {"likes": 50, "shares": 10})

##############################################################################################

# import os
# import uuid
# import json
# from typing import List, Dict
# from moviepy.editor import VideoFileClip
# import speech_recognition as sr
# from gtts import gTTS
# from googletrans import Translator
# import tempfile
# import requests
# # from astrapy import DataAPIClient

# # Supported languages
# INDIAN_LANGUAGES = {
#     'Hindi': 'hi',
#     'Marathi': 'mr',
#     'Gujarati': 'gu',
#     'Tamil': 'ta',
#     'Kannada': 'kn',
#     'Telugu': 'te',
#     'Bengali': 'bn',
#     'Malayalam': 'ml',
#     'Punjabi': 'pa',
#     'Odia': 'or'
# }

# # Initialize the client
# client = DataAPIClient("AstraCS:mFxzlrvbjjtutFaHODtbbcpn:397567b1b519cdcb1e306a12956ffe600fd3900a11e62f352ca2b2acbd525d38")
# db = client.get_database_by_api_endpoint(
#     "https://991b0d3b-9ff6-4122-8be8-aeea742bed6e-us-east-2.apps.astra.datastax.com",
#     keyspace="default_keyspace",
# )

# print(f"Connected to Astra DB: {db.list_collection_names()}")

# # Process video file
# def process_video(video_file, source_language):
#     session_id = str(uuid.uuid4())
#     audio_path = convert_video_to_audio(video_file)
#     if not audio_path:
#         raise Exception("Failed to convert video to audio")
    
#     try:
#         # Transcribe audio to English
#         english_text = transcribe_audio_to_english(audio_path, source_language)
#         if not english_text:
#             raise Exception("Failed to transcribe audio")
        
#         # Generate translations and audio files
#         translations = {}
#         for lang_name, lang_code in INDIAN_LANGUAGES.items():
#             translated_text = translate_text(english_text, lang_code)
#             if translated_text:
#                 audio_filename = f"{session_id}_{lang_code}.mp3"
#                 audio_path = create_audio_file(translated_text, lang_code, audio_filename)
#                 translations[lang_name] = {
#                     'text': translated_text,
#                     'audio_url': f'/api/audio/{audio_filename}'
#                 }
        
#         # Extract only the 'english_text' and 'translations' for upload
#         data_for_upload = extract_transcriptions_from_json({
#             'english_text': english_text,
#             'translations': translations
#         })

#         # Upload data to Datastax Astra DB
#         collection = db.get_collection("transcriptions")
#         collection.insert_one(data_for_upload)

#         return data_for_upload

#     finally:
#         # Cleanup
#         if audio_path and os.path.exists(audio_path):
#             os.remove(audio_path)

# # Convert video to audio
# def convert_video_to_audio(video_file):
#     try:
#         temp_video = tempfile.mktemp(suffix='.mp4')
#         video_file.save(temp_video)
        
#         video = VideoFileClip(temp_video)
#         audio_path = tempfile.mktemp(suffix='.wav')
#         video.audio.write_audiofile(audio_path)
        
#         video.close()
#         os.remove(temp_video)
        
#         return audio_path
#     except Exception as e:
#         print(f"Error converting video to audio: {str(e)}")
#         return None

# # Transcribe audio
# def transcribe_audio_to_english(audio_path, source_language):
#     try:
#         recognizer = sr.Recognizer()
#         with sr.AudioFile(audio_path) as source:
#             audio = recognizer.record(source)
#         text = recognizer.recognize_google(audio, language=source_language)
        
#         if source_language != 'en-US':
#             translator = Translator()
#             translation = translator.translate(text, dest='en')
#             return translation.text
#         return text
#     except Exception as e:
#         print(f"Error in transcription: {str(e)}")
#         return None

# # Translate text
# def translate_text(text, target_language):
#     try:
#         translator = Translator()
#         translation = translator.translate(text, dest=target_language)
#         return translation.text
#     except Exception as e:
#         print(f"Error translating text: {str(e)}")
#         return None

# # Create audio file from text
# def create_audio_file(text, language_code, filename):
#     try:
#         output_path = os.path.join('temp', filename)
#         tts = gTTS(text=text, lang=language_code, slow=False)
#         tts.save(output_path)
#         return output_path
#     except Exception as e:
#         print(f"Error creating audio file: {str(e)}")
#         return None

# # Extract transcription data for upload
# def extract_transcriptions_from_json(data: Dict) -> Dict:
#     """Extract transcription data for upload with 'english_text' and 'translations'."""
#     try:
#         return {
#             'english_text': data['english_text'],
#             'translations': data['translations']
#         }
#     except KeyError as e:
#         raise Exception(f"Missing required key in data: {str(e)}")

