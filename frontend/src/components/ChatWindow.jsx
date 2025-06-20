import React, { useState } from 'react';
import { sendMessage } from '../api/chatbotAPI';

// Initial rules for the chatbot
const INITIAL_RULES = [
    {
        pattern: "Qu'est-ce que l'EST Salé ?",
        answer: "L'École Supérieure de Technologie de Salé (EST-Salé) est un établissement public d'enseignement supérieur professionnel rattaché à l'Université Mohammed V de Rabat, inauguré en 1993-1994. \nElle forme en deux ans des techniciens supérieurs via le DUT, avec une offre de Licence professionnelle depuis 2014–2015."
    },
    {
        pattern: "Quelles sont les filières disponibles ?",
        answer: "Filières DUT (Bac+2) : Techniques de Management, Marketing & Techniques de Commercialisation, Environnement et Techniques de l'Eau, Génie Civil, Construction & Énergétique du Bâtiment, Génie Bio‑Industriel, Administration Réseau Informatiques, Génie Logiciel, Génie Électrique & Informatique Industrielle, Génie Industriel & Maintenance. \nLicences Professionnelles : Efficience Énergétique & Acoustique du Bâtiment, Génie Civil, Logistique de Distribution, Ingénierie des Applications Mobiles, Instrumentation & Maintenance Biomédicale, Maintenance des Équipements Scientifiques, Diagnostic & Maintenance des Systèmes Électroniques Embarqués (automobile)."
    },
    {
        pattern: "Quels sont les débouchés après un DUT à l'EST Salé ?",
        answer: "Les diplômés du DUT peuvent poursuivre leurs études en Licence professionnelle, écoles d'ingénieurs ou en masters professionnels. \nCertains intègrent directement le marché du travail dans les secteurs industriels, informatiques, environnementaux ou commerciaux selon la spécialité."
    },
    {
        pattern: "Les chiffres clés ?",
        answer: "L'EST Salé compte environ 84 enseignants permanents et 96 personnels administratifs, 1300 étudiants en DUT et 120 en Licence pro, 10 filières DUT et 6 filières LP en initial, avec un taux de diplômation proche de 100%. L'infrastructure comprend 5 hectares, 2 amphithéâtres (250 places), salles, laboratoires, bibliothèques, 900 postes informatiques et un complexe omnisport."
    },
    {
        pattern: "Comment s'inscrire ?",
        answer: "Pour le DUT : inscription en ligne via le portail préinscription.um5.ac.ma, sur sélection (75% Bac national + 25% Bac régional). \nPour la Licence pro : préinscriptions en ligne (dates variables), sélection via dossier et concours écrit/entretien."
    },
    {
        pattern: "Contact EST Salé",
        answer: "Téléphone : 05 37 88 15 61 / 62 / 63, \nEmail : ests@um5.ac.ma, \nAdresse : Avenue Prince Héritier, B.P. 227, Salé 11000, Maroc, \nSite officiel : http://est.um5.ac.ma"
    },
    {
        pattern: "Y a-t-il une résidence universitaire pour les étudiants de l'EST Salé ?",
        answer: "L'EST Salé ne dispose pas de résidence propre, mais les étudiants peuvent accéder aux résidences universitaires de l'UM5 à Salé ou Rabat, selon les places disponibles et les critères sociaux."
    },
    {
        pattern: "Quels sont les clubs ou activités parascolaires disponibles ?",
        answer: "L'EST Salé propose plusieurs clubs étudiants : club robotique, club environnement, club entrepreneuriat, club sport, club théâtre, etc. \nDes compétitions inter-établissements et des journées culturelles sont aussi organisées régulièrement."
    }
];

const ChatWindow = () => {
    const [open, setOpen] = useState(false);
    const [conversationStarted, setConversationStarted] = useState(false);
    const [messages, setMessages] = useState([
        { from: 'bot', text: 'Bienvenue ! Nous sommes là pour vous aider.' }
    ]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [search, setSearch] = useState('');
    const [rules, setRules] = useState(INITIAL_RULES); // State for dynamic rules

    const handleSend = async () => {
        if (!input.trim()) return;
        setMessages([...messages, { from: 'user', text: input }]);
        setLoading(true);
        setError('');
        try {
            const res = await sendMessage(input);
            setMessages((msgs) => [...msgs, { from: 'bot', text: res.response }]);
        } catch (e) {
            setError("Erreur lors de la communication avec le chatbot.");
        }
        setInput('');
        setLoading(false);
    };

    const handleSuggestion = (pattern, answer) => {
        setMessages([...messages, { from: 'user', text: pattern }, { from: 'bot', text: answer }]);
        // Remove the used suggestion from the rules list
        setRules(rules.filter(rule => rule.pattern !== pattern));
    };

    const refreshChat = () => {
        setConversationStarted(false);
        setMessages([{ from: 'bot', text: 'Salut ! ' }]);
        setInput('');
        setError('');
        setSearch('');
        setRules(INITIAL_RULES); // Reset rules to initial state
    };

    const handleClose = () => {
        refreshChat(); // Reset state when closing
        setOpen(false);
    };

    const ChatButton = (
        <button
            onClick={() => setOpen(true)} // Reopening uses refreshed state
            style={{
                position: 'fixed',
                right: 20,
                bottom: 20,
                width: 56,
                height: 56,
                borderRadius: '50%',
                background: '#ff8000',
                border: 'none',
                boxShadow: '0 2px 8px #0002',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 1000,
                cursor: 'pointer',
            }}
            aria-label="Ouvrir le chatbot"
        >
            <svg width="28" height="28" fill="#fff" viewBox="0 0 24 24">
                <path d="M2 21l1.65-4.95A8.963 8.963 0 0 1 2 12C2 6.48 7.03 2 13 2s11 4.48 11 10-5.03 10-11 10c-1.61 0-3.16-.25-4.6-.7L2 21z" />
            </svg>
        </button>
    );

    const ChatPanel = (
        <div style={{
            position: 'fixed',
            right: 0,
            bottom: 0,
            height: '100vh',
            width: 350,
            maxWidth: '90vw',
            background: '#fff',
            boxShadow: '2px 0 12px #0002',
            zIndex: 1100,
            display: 'flex',
            flexDirection: 'column',
            borderTopRightRadius: 16,
            borderRight: '1px solid #eee',
            borderTop: '1px solid #eee',
            overflowX: 'hidden',
        }}>
            <div style={{ background: '#ff8000', color: '#fff', padding: 24, fontSize: 24, fontWeight: 700, borderTopRightRadius: 16, position: 'relative', overflowX: 'hidden' }}>
                Bienvenue
                <div style={{ fontSize: 16, fontWeight: 400, marginTop: 4 }}>Nous sommes là pour vous aider</div>
                <button
                    onClick={handleClose} // Updated to call handleClose
                    style={{ position: 'absolute', right: 16, top: 16, background: 'none', border: 'none', color: '#fff', fontSize: 24, cursor: 'pointer' }}
                    aria-label="Fermer le chatbot"
                >×</button>
                <button
                    onClick={refreshChat}
                    style={{ position: 'absolute', right: 50, top: 16, background: 'none', border: 'none', color: '#fff', fontSize: 20, cursor: 'pointer' }}
                    aria-label="Rafraîchir le chatbot"
                >⟳</button>
            </div>
            <div style={{ flex: 1, overflowY: 'auto', padding: 24, background: '#faf9f7', overflowX: 'hidden' }}>
                {!conversationStarted ? (
                    <div style={{ background: '#fff', borderRadius: 8, boxShadow: '0 2px 8px #0001', padding: 20, overflowX: 'hidden' }}>
                        <div style={{ fontSize: 22, fontWeight: 600, marginBottom: 12 }}>Lancer une conversation</div>
                        <button
                            onClick={() => setConversationStarted(true)}
                            style={{ background: '#ff8000', color: '#fff', border: 'none', borderRadius: 6, padding: '12px 24px', fontSize: 18, fontWeight: 700, boxShadow: '0 2px 8px #0002', cursor: 'pointer', display: 'flex', alignItems: 'center', width: '100%', textAlign: 'center' }}
                        >
                            <svg width="24" height="24" fill="#fff" style={{ marginRight: 8 }} viewBox="0 0 24 24"><path d="M2 21l21-9-21-9v7l15 2-15 2z" /></svg>
                            Envoyez-nous un message
                        </button>
                    </div>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflowX: 'hidden' }}>
                        <div style={{ padding: 10, overflowX: 'hidden' }}>
                            <input
                                type="text"
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                                placeholder="Rechercher un sujet..."
                                style={{ width: '100%', border: '1px solid #ccc', borderRadius: 16, padding: '8px 14px', boxSizing: 'border-box' }}
                            />
                            {search && (
                                <div style={{ marginTop: 8, overflowX: 'hidden' }}>
                                    {rules.filter(rule => rule.pattern.toLowerCase().includes(search.toLowerCase())).map((rule, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => handleSuggestion(rule.pattern, rule.answer)}
                                            style={{ background: '#fff', color: '#ff8000', border: '2px solid #ff8000', borderRadius: 20, padding: '8px 16px', margin: '4px 0', display: 'block', width: '100%', textAlign: 'left', boxSizing: 'border-box', whiteSpace: 'normal', overflow: 'hidden', textOverflow: 'ellipsis' }}
                                        >
                                            {rule.pattern}
                                        </button>
                                    ))}
                                    {rules.filter(rule => rule.pattern.toLowerCase().includes(search.toLowerCase())).length === 0 && (
                                        <div style={{ color: '#888' }}>Aucun résultat trouvé.</div>
                                    )}
                                </div>
                            )}
                        </div>
                        <div style={{ flex: 1, overflowY: 'auto', padding: 10, overflowX: 'hidden' }}>
                            {messages.map((msg, idx) => (
                                <div key={idx} style={{ textAlign: msg.from === 'bot' ? 'left' : 'right', margin: '8px 0', wordBreak: 'break-word', overflowX: 'hidden' }}>
                                    <span style={{ background: msg.from === 'bot' ? '#eee' : '#ff8000', color: msg.from === 'bot' ? '#333' : '#fff', padding: '10px 15px', borderRadius: 16, display: 'inline-block', maxWidth: '90%', whiteSpace: 'normal', boxSizing: 'border-box' }}>
                                        {msg.text}
                                    </span>
                                </div>
                            ))}
                            {loading && <div style={{ color: '#888' }}>Le bot réfléchit...</div>}
                            {error && <div style={{ color: 'red' }}>{error}</div>}
                        </div>
                        <div style={{ padding: 10, borderTop: '1px solid #eee', overflowX: 'hidden' }}>
                            <input
                                type="text"
                                value={input}
                                onChange={e => setInput(e.target.value)}
                                onKeyDown={e => e.key === 'Enter' && handleSend()}
                                placeholder="Écrivez votre message..."
                                style={{ width: 'calc(100% - 80px)', border: '1px solid #ccc', borderRadius: 16, padding: '6px 12px', boxSizing: 'border-box' }}
                                disabled={loading}
                            />
                            <button onClick={handleSend} disabled={loading || !input.trim()} style={{ width: 70, background: '#ff8000', color: '#fff', border: 'none', borderRadius: 16, padding: '6px 0', marginLeft: 10 }}>
                                Envoyer
                            </button>
                        </div>
                        <div style={{ padding: 10, overflowX: 'hidden' }}>
                            <div style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>Parcourez cette page avec nous</div>
                            <button style={{ background: '#ff8000', color: '#fff', border: 'none', borderRadius: 6, padding: '8px 16px', width: '100%', textAlign: 'center', boxSizing: 'border-box' }}>
                                Rejoindre la co-navigation
                            </button>
                            <div style={{ color: '#888', fontSize: 12, marginTop: 4 }}>
                                (bientôt disponible)
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );

    return (
        <>
            {!open && ChatButton}
            {open && ChatPanel}
        </>
    );
};

export default ChatWindow;