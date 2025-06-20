# Exécution de Microservice "chatbot"

## 1. Pour créer les services :

```
docker-compose up --build
```

## 2. Extraction "pull" du modèle :

```
docker exec -it <ollama_container_id> ollama pull llama3
```

## 3. Vérification du modèle :

```
docker exec -it <ollama_container_id> ollama list
```

## 4. Les logs (backend, ollama et frontend) :

Les logs proviennent de trois conteneurs : backend, ollama et frontend.
Vérification des logs:

```
docker logs <container_id>
```

## 5. Test :

Accédez à http://localhost:3000 et envoyez un message.

---
