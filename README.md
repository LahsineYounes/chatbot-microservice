## Not Finished Yet  
> (*Détails dans la Roadmap ci-dessous !*)

---
### Architecture globale :
> Le projet vise à créer un espace de travail numérique (ENT) reposant sur une architecture de microservices standardisée, sécurisée et évolutive.
> Cet ENT sera augmenté par de l’IA (conversationnelle et générative).

```
[Auth Service] ↔ [Admin Service] ↔ [Files Service] ↔ [CHATBOT ⚡] 
         │              │                 │          (ce repo !) 
         │              │                 │              │ 
         └────────────────────── ENT ────────────────────┘
```

---
### ✨ Ce microservice contient :
- Backend : API Node.js/Python pour orchestrer les conversations
- IA Locale : Ollama + Llama3 (100% offline/privacy)
- Frontend : Interface chat HTML/JS réactive
- Docker : Déploiement 1-clic avec docker-compose

---
### 🚀 Demo de Démarrage :

```
# 1. Clone & lance tous les services
docker-compose up --build

# 2. Pull le modèle IA (1ère fois seulement)
docker exec -it <ollama_container_id> ollama pull llama3

# 3. Vérifie le modèle
docker exec -it <ollama_container_id> ollama list

# 4. Check les logs (3 conteneurs)
docker logs <backend_container_id>
docker logs <ollama_container_id> 
docker logs <frontend_container_id>

# 5. Test : Ouvre http://localhost:3000 → Chat IA fonctionnel ! 🎉
```

---
### 📱 Screenshots :

<img width="1047" alt="Screenshot 2025-06-20 at 19 55 04" src="https://github.com/user-attachments/assets/a08b1c9e-c0e1-4e6f-83a7-dd2005b438f6" />

---
### 📋 Roadmap : 

✅ Terminé : Dockerisation complète, Ollama integration, Chat basique.

🔄 En cours : WebSocket real-time, Auth integration. 

⏳ À venir :
- Multi-modèles IA (Mistral, Gemma)
- Streaming réponses
- Kubernetes deployment
- Monitoring (Prometheus)

