import { useState, useRef } from 'react';
import { SVCS, Service } from '../data/services';
import { TRAINING_PROGS, LEARN_AREAS, HACK_DOMAINS, LearningArea } from '../data/training';
import { KB, FALLBACK_WORDS, MENU, MenuItem } from '../data/knowledgeBase';
import { ChatMessage, MessageExtra } from '../components/Message';
import { GlassCardItem } from '../components/GlassCard';
import { FormField } from '../components/DynamicForm';
import { QuickButtonItem } from '../components/QuickButtons';

let msgCounter = 0;
const genId = () => `msg-${++msgCounter}-${Date.now()}`;

function getTimestamp(): string {
  const d = new Date();
  return d.getHours().toString().padStart(2, '0') + ':' + d.getMinutes().toString().padStart(2, '0');
}

export function useChatbot() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [showNotif, setShowNotif] = useState(true);
  const [inputValue, setInputValue] = useState('');

  const initializedRef = useRef(false);
  const enquiryModeRef = useRef(false);

  // ─── Helpers ────────────────────────────────────────────────────────────────

  function addBotMsg(html?: string, extra?: MessageExtra) {
    const msg: ChatMessage = {
      id: genId(),
      role: 'bot',
      html,
      extra,
      timestamp: getTimestamp(),
    };
    setMessages((prev) => [...prev, msg]);
  }

  function addUserMsg(text: string) {
    const msg: ChatMessage = {
      id: genId(),
      role: 'user',
      text,
      timestamp: getTimestamp(),
    };
    setMessages((prev) => [...prev, msg]);
  }

  function withTyping(fn: () => void, delay = 1100) {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      fn();
    }, delay);
  }

  // Converts MENU items to QuickButtonItem[]
  const menuAsQB = (): QuickButtonItem[] => MENU.map((m) => ({ label: m.label, key: m.key }));

  // ─── Shared flows ────────────────────────────────────────────────────────────

  function afterForm(name?: string) {
    withTyping(() => {
      addBotMsg(undefined, { type: 'thankYou', name });
      setTimeout(() => {
        withTyping(() => {
          addBotMsg('Would you like to stay connected with ZeAI Soft?', { type: 'social' });
          setTimeout(showMainMenu, 1800);
        }, 700);
      }, 1200);
    }, 900);
  }

  function simpleConnectForm(extraFields: FormField[] = []) {
    const base: FormField[] = [
      { key: 'name', label: 'Name', type: 'text' },
      { key: 'email', label: 'Email Address', type: 'email' },
      { key: 'phone', label: 'Phone Number', type: 'tel' },
    ];
    return [...base, ...extraFields];
  }

  // ─── Main Menu ───────────────────────────────────────────────────────────────

  function showMainMenu() {
    withTyping(() => {
      addBotMsg(
        'Sure! 👋 Welcome back to ZeAI Soft Assistant.<br>How can I help you today?',
        {
          type: 'quickButtons',
          items: menuAsQB(),
          onSelect: handleMenu,
        },
      );
    }, 700);
  }

  function handleMenu(it: MenuItem | QuickButtonItem) {
    if (it.key === 'services') { addUserMsg(it.label); showServices(); }
    else if (it.key === 'training') { addUserMsg(it.label); showTraining(); }
    else if (it.key === 'collab') { addUserMsg(it.label); showCollab(); }
    else if (it.key === 'enquiry') { addUserMsg(it.label); showEnquiry(); }
  }

  // ─── Services ────────────────────────────────────────────────────────────────

  function showServices() {
    withTyping(() => {
      addBotMsg(
        'ZeAI Soft provides technology solutions to help businesses build innovative and scalable digital solutions.',
        {
          type: 'glassCard',
          title: 'ZeAI Soft Services',
          items: SVCS as unknown as GlassCardItem[],
          onSelect: (item) => showSvcDetail(item as unknown as Service),
        },
      );
    });
  }

  function showSvcDetail(svc: Service) {
    addUserMsg(svc.label);
    withTyping(() => {
      addBotMsg(undefined, {
        type: 'composite',
        bubbleHtml:
          svc.desc +
          '<br><br>Would you like to discuss your requirements with our team?',
        inner: {
          type: 'quickButtons',
          items: [
            { label: '✅ Yes', key: 'y' },
            { label: '❌ No', key: 'n' },
          ],
          onSelect: (btn) => {
            if (btn.key === 'y') {
              addUserMsg('Yes');
              withTyping(() => {
                const fields: FormField[] = [
                  { key: 'name', label: 'Name', type: 'text' },
                  { key: 'email', label: 'Email Address', type: 'email' },
                  { key: 'phone', label: 'Phone Number', type: 'tel' },
                  { key: 'req', label: svc.req, type: 'textarea' },
                ];
                addBotMsg(
                  'Great! Please share your details so our team can understand your requirements better.',
                  {
                    type: 'form',
                    fields,
                    submitLabel: 'Send Details',
                    onSubmit: (vals) => {
                      addUserMsg('Details submitted ✓');
                      afterForm(vals.name);
                    },
                  },
                );
              });
            } else {
              addUserMsg('No');
              withTyping(() => {
                addBotMsg('No problem! Feel free to explore other options.', {
                  type: 'quickButtons',
                  items: menuAsQB(),
                  onSelect: handleMenu,
                });
              }, 700);
            }
          },
        },
      });
    });
  }

  // ─── Training ────────────────────────────────────────────────────────────────

  function showTraining() {
    withTyping(() => {
      addBotMsg(
        'ZeAI Soft provides industry-focused training programs designed to help students develop technical skills and gain practical learning experience.<br><br>Which program would you like to know more about?',
        {
          type: 'glassCard',
          title: 'Training Programs',
          items: TRAINING_PROGS as GlassCardItem[],
          onSelect: handleTraining,
        },
      );
    });
  }

  function handleTraining(p: GlassCardItem) {
    addUserMsg(p.label);
    if (p.key === 'skillup') showSkillUp();
    else if (p.key === 'gip') showGIP();
    else if (p.key === 'hack') showHackathon();
    else if (p.key === 'kirthika') showKirthika();
  }

  // ── Skill-Up ──

  function showSkillUp() {
    withTyping(() => {
      addBotMsg(undefined, {
        type: 'composite',
        bubbleHtml:
          'ZeAI Skill-Up – On Campus is a student-focused skill development program by ZeAI Soft.<br><br><strong>Program Highlights:</strong><br>• Industry-focused skill development<br>• Practical learning approach<br>• Technology-based training<br>• Guidance from ZeAI Soft team<br><br>Would you like to explore more?',
        inner: {
          type: 'quickButtons',
          items: [
            { label: '📚 Learning Areas', key: 'la' },
            { label: '🤝 Connect with Team', key: 'ct' },
            { label: '← Back to Programs', key: 'bk' },
          ],
          onSelect: (btn) => {
            if (btn.key === 'la') { addUserMsg('Learning Areas'); showLearningAreas(); }
            else if (btn.key === 'ct') { addUserMsg('Connect with Team'); showSkillUpTeamForm(); }
            else { addUserMsg('Back to Programs'); showTraining(); }
          },
        },
      });
    });
  }

  function showLearningAreas() {
    withTyping(() => {
      addBotMsg(
        'ZeAI Skill-Up – On Campus helps students explore and develop skills in emerging technology domains.<br><br>Which learning area would you like to explore?',
        {
          type: 'glassCard',
          title: 'Learning Areas',
          items: LEARN_AREAS as unknown as GlassCardItem[],
          onSelect: (item) => showLearningDetail(item as unknown as LearningArea),
        },
      );
    }, 700);
  }

  function showLearningDetail(area: LearningArea) {
    addUserMsg(area.label);
    withTyping(() => {
      addBotMsg(undefined, {
        type: 'composite',
        bubbleHtml: area.body + '<br><br>Would you like to know more? Connect with our team.',
        inner: {
          type: 'quickButtons',
          items: [
            { label: '🤝 Connect with Team', key: 'ct' },
            { label: '← Back to Learning Areas', key: 'bk' },
          ],
          onSelect: (btn) => {
            if (btn.key === 'ct') { addUserMsg('Connect with Team'); showLAConnectForm(area.label); }
            else { addUserMsg('Back to Learning Areas'); showLearningAreas(); }
          },
        },
      });
    });
  }

  function showLAConnectForm(areaName: string) {
    withTyping(() => {
      const fields: FormField[] = [
        { key: 'name', label: 'Name', type: 'text' },
        { key: 'email', label: 'Email Address', type: 'email' },
        { key: 'phone', label: 'Phone Number', type: 'tel' },
        { key: 'area', label: 'Interested Learning Area', type: 'text', defaultValue: areaName },
      ];
      addBotMsg(
        'Great! We would be happy to help you with more information about ZeAI Skill-Up – On Campus.<br><br>Please share your details:',
        {
          type: 'form',
          fields,
          submitLabel: 'Send Details',
          onSubmit: (vals) => {
            addUserMsg('Details submitted ✓');
            afterForm(vals.name);
          },
        },
      );
    });
  }

  function showSkillUpTeamForm() {
    withTyping(() => {
      const fields: FormField[] = [
        { key: 'name', label: 'Name', type: 'text' },
        { key: 'email', label: 'Email Address', type: 'email' },
        { key: 'phone', label: 'Phone Number', type: 'tel' },
        { key: 'area', label: 'Interested Learning Area', type: 'text' },
      ];
      addBotMsg(
        'Great! Please share your details so our ZeAI Soft team can assist you further.',
        {
          type: 'form',
          fields,
          submitLabel: 'Send Details',
          onSubmit: (vals) => {
            addUserMsg('Details submitted ✓');
            afterForm(vals.name);
          },
        },
      );
    });
  }

  // ── Global Immersion Program ──

  function showGIP() {
    withTyping(() => {
      addBotMsg(undefined, {
        type: 'composite',
        bubbleHtml:
          'Global Immersion Program is a training initiative by ZeAI Soft designed to provide students with broader exposure to industry learning and practical experience.<br><br>The program helps students understand real-world technology applications and improve their technical skills through guided learning sessions.<br><br>Would you like to know more? Connect with our team.',
        inner: {
          type: 'quickButtons',
          items: [
            { label: '🤝 Connect with Team', key: 'ct' },
            { label: '← Back to Programs', key: 'bk' },
          ],
          onSelect: (btn) => {
            if (btn.key === 'ct') {
              addUserMsg('Connect with Team');
              withTyping(() => {
                const fields = simpleConnectForm([{ key: 'interest', label: 'Area of Interest', type: 'text' }]);
                addBotMsg('Please share your details:', {
                  type: 'form',
                  fields,
                  submitLabel: 'Send Details',
                  onSubmit: (vals) => {
                    addUserMsg('Details submitted ✓');
                    afterForm(vals.name);
                  },
                });
              });
            } else {
              addUserMsg('Back to Programs');
              showTraining();
            }
          },
        },
      });
    });
  }

  // ── Hackathon 2026 ──

  function showHackathon() {
    const domainsHtml = HACK_DOMAINS.map((d) => '• ' + d).join('<br>');
    withTyping(() => {
      addBotMsg(undefined, {
        type: 'composite',
        bubbleHtml:
          'Hackathon 2026 is an innovation event by ZeAI Soft that provides a platform for participants to develop and showcase technology-based solutions.<br><br>Participants can register as a team and select their preferred hackathon domain.<br><br><strong>Hackathon Domains:</strong><br>' +
          domainsHtml +
          '<br><br>Would you like to know more?',
        inner: {
          type: 'quickButtons',
          items: [
            { label: '👥 Participation Details', key: 'pd' },
            { label: '📝 Registration Details', key: 'rd' },
            { label: '🤝 Connect with Team', key: 'ct' },
          ],
          onSelect: (btn) => {
            if (btn.key === 'pd') showHackParticipation();
            else if (btn.key === 'rd') showHackRegistration();
            else { addUserMsg('Connect with Team'); showHackTeamForm(); }
          },
        },
      });
    });
  }

  function showHackParticipation() {
    addUserMsg('Participation Details');
    withTyping(() => {
      addBotMsg(undefined, {
        type: 'composite',
        bubbleHtml:
          'Hackathon 2026 is open to students, professionals, developers, designers, and innovators from across India.<br><br>Whether you are a beginner or an experienced developer, everyone is welcome to participate and showcase their ideas.<br><br><strong>Required Details:</strong><br>• Team Member Name<br>• Email Address<br>• Mobile Number<br>• Preferred Hackathon Domain<br>• Previous Hackathon Experience<br><br>Would you like to proceed with registration?',
        inner: {
          type: 'quickButtons',
          items: [
            { label: '📝 Registration Details', key: 'rd' },
            { label: '🤝 Connect with Team', key: 'ct' },
            { label: '← Back to Hackathon', key: 'bk' },
          ],
          onSelect: (btn) => {
            if (btn.key === 'rd') showHackRegistration();
            else if (btn.key === 'ct') { addUserMsg('Connect with Team'); showHackTeamForm(); }
            else { addUserMsg('Back to Hackathon Details'); showHackathon(); }
          },
        },
      });
    });
  }

  function showHackRegistration() {
    addUserMsg('Registration Details');
    withTyping(() => {
      addBotMsg(undefined, {
        type: 'composite',
        bubbleHtml:
          'To participate in Hackathon 2026, complete your registration through the official registration page.<br><br>Click here to register:<br>👉 <a href="https://www.zeaisoft.com/hackathon" target="_blank" class="hlink">Hackathon Registration</a><br><br>After registration, our team will review your details and contact you for further updates.<br><br>Would you like any other help?',
        inner: {
          type: 'quickButtons',
          items: [
            { label: '👥 Participation Details', key: 'pd' },
            { label: '← Back to Training Programs', key: 'bk' },
            { label: '🤝 Connect with Team', key: 'ct' },
          ],
          onSelect: (btn) => {
            if (btn.key === 'pd') showHackParticipation();
            else if (btn.key === 'bk') { addUserMsg('Back to Training Programs'); showTraining(); }
            else { addUserMsg('Connect with Team'); showHackTeamForm(); }
          },
        },
      });
    });
  }

  function showHackTeamForm() {
    withTyping(() => {
      const fields: FormField[] = [
        { key: 'name', label: 'Name', type: 'text' },
        { key: 'email', label: 'Email Address', type: 'email' },
        { key: 'phone', label: 'Phone Number', type: 'tel' },
        { key: 'college', label: 'College / Organization Name', type: 'text' },
        { key: 'interest', label: 'Area of Interest', type: 'text' },
      ];
      addBotMsg(
        'Great! We will help you with more details about Hackathon 2026.<br><br>Please provide your details:',
        {
          type: 'form',
          fields,
          submitLabel: 'Send Details',
          onSubmit: (vals) => {
            addUserMsg('Details submitted ✓');
            afterForm(vals.name);
          },
        },
      );
    });
  }

  // ── Kirthika ──

  function showKirthika() {
    withTyping(() => {
      addBotMsg(undefined, {
        type: 'composite',
        bubbleHtml:
          'You can connect with <strong>Kirthika K – Founder of ZeAI Soft</strong> for career guidance, startup discussions, and personalized advice.<br><br><strong>This session helps with:</strong><br>• Career direction<br>• Startup journey<br>• Resume & job-related queries<br>• Project ideas<br><br>Would you like to book a session?',
        inner: {
          type: 'quickButtons',
          items: [
            { label: '📅 Book Session', key: 'book' },
            { label: 'ℹ️ Know More', key: 'more' },
            { label: '← Back to Main Menu', key: 'bk' },
          ],
          onSelect: (btn) => {
            if (btn.key === 'book') { addUserMsg('Book Session'); showKirthikaForm(); }
            else if (btn.key === 'more') { addUserMsg('Know More'); showKirthikaMore(); }
            else { addUserMsg('Back to Main Menu'); showMainMenu(); }
          },
        },
      });
    });
  }

  function showKirthikaMore() {
    withTyping(() => {
      addBotMsg(undefined, {
        type: 'composite',
        bubbleHtml:
          '<strong>Kirthika K – Founder of ZeAI Soft</strong><br><br>Kirthika offers practical guidance based on her experience in AI, product development, and leading a startup.<br><br><strong>The 1:1 session can help you with:</strong><br>• Career clarity and direction<br>• Startup journey guidance<br>• Real-world problem solving<br>• Resume and job-related discussions<br>• Project and idea discussions<br><br>Would you like to book a session?',
        inner: {
          type: 'quickButtons',
          items: [
            { label: '📅 Book Session', key: 'book' },
            { label: '← Back to Main Menu', key: 'bk' },
          ],
          onSelect: (btn) => {
            if (btn.key === 'book') { addUserMsg('Book Session'); showKirthikaForm(); }
            else { addUserMsg('Back to Main Menu'); showMainMenu(); }
          },
        },
      });
    });
  }

  function showKirthikaForm() {
    withTyping(() => {
      const fields: FormField[] = [
        { key: 'name', label: 'Name', type: 'text' },
        { key: 'email', label: 'Email Address', type: 'email' },
        { key: 'phone', label: 'Phone Number', type: 'tel' },
        { key: 'purpose', label: 'Purpose of Session', type: 'textarea' },
      ];
      addBotMsg('Please provide your details:', {
        type: 'form',
        fields,
        submitLabel: 'Send Details',
        onSubmit: (vals) => {
          addUserMsg('Details submitted ✓');
          withTyping(() => {
            addBotMsg(undefined, { type: 'thankYou', name: vals.name });
            setTimeout(() => {
              withTyping(() => {
                addBotMsg(
                  'Your request has been recorded. Our team will contact you for further assistance.',
                  {
                    type: 'quickButtons',
                    items: menuAsQB(),
                    onSelect: handleMenu,
                  },
                );
              }, 700);
            }, 1200);
          }, 900);
        },
      });
    });
  }

  // ─── Collaboration ───────────────────────────────────────────────────────────

  function showCollab() {
    withTyping(() => {
      const fields: FormField[] = [
        { key: 'name', label: 'Name', type: 'text' },
        { key: 'company', label: 'Company Name', type: 'text' },
        { key: 'email', label: 'Email Address', type: 'email' },
        { key: 'phone', label: 'Phone Number', type: 'tel' },
        { key: 'req', label: 'Collaboration Requirement', type: 'textarea' },
      ];
      addBotMsg(
        'Thank you for your interest in collaborating with ZeAI Soft.\u00A0ZeAI Soft works with businesses and organizations to provide AI-driven solutions, technology services, and digital transformation support.<br><br>Please share your collaboration requirements:',
        {
          type: 'form',
          fields,
          submitLabel: 'Send Details',
          onSubmit: (vals) => {
            addUserMsg('Details submitted ✓');
            afterForm(vals.name);
          },
        },
      );
    });
  }

  // ─── Enquiry ─────────────────────────────────────────────────────────────────

  function showEnquiry() {
    enquiryModeRef.current = true;
    withTyping(() => {
      addBotMsg(
        'Sure! Please enter your question or enquiry.\u00A0I will help you with the relevant information about ZeAI Soft.',
      );
    }, 800);
  }

  function handleEnquiry(txt: string) {
    const lower = txt.toLowerCase();
    const isFallback = FALLBACK_WORDS.some((w) => lower.includes(w));
    if (isFallback) {
      enquiryModeRef.current = false;
      withTyping(() => {
        addBotMsg(
          "I'm here to help you with ZeAI Soft services, programs, and support. Please select an option below.",
          { type: 'quickButtons', items: menuAsQB(), onSelect: handleMenu },
        );
      }, 900);
      return;
    }
    const match = KB.find((k) => k.m.some((w) => lower.includes(w)));
    const ans = match
      ? match.a
      : 'Based on your query, here is the relevant information from ZeAI Soft. For more specific details, please connect with our team.';

    withTyping(() => {
      addBotMsg(undefined, {
        type: 'composite',
        bubbleHtml:
          ans +
          '<br><br>If you need further assistance, you can connect with our ZeAI Soft team.',
        inner: {
          type: 'quickButtons',
          items: [
            { label: '🤝 Connect with Team', key: 'ct' },
            { label: '🏠 Back to Main Menu', key: 'bk' },
          ],
          onSelect: (btn) => {
            enquiryModeRef.current = false;
            if (btn.key === 'ct') {
              addUserMsg('Connect with Team');
              withTyping(() => {
                const fields: FormField[] = [
                  { key: 'name', label: 'Name', type: 'text' },
                  { key: 'email', label: 'Email Address', type: 'email' },
                  { key: 'phone', label: 'Phone Number', type: 'tel' },
                  { key: 'query', label: 'Your Enquiry', type: 'textarea' },
                ];
                addBotMsg('Please provide your details:', {
                  type: 'form',
                  fields,
                  submitLabel: 'Send Details',
                  onSubmit: (vals) => {
                    addUserMsg('Details submitted ✓');
                    afterForm(vals.name);
                  },
                });
              });
            } else {
              addUserMsg('Back to Main Menu');
              showMainMenu();
            }
          },
        },
      });
    }, 900);
  }

  // ─── Free text routing ───────────────────────────────────────────────────────

  function handleFreeText(txt: string) {
    const lower = txt.toLowerCase();
    if (enquiryModeRef.current) {
      handleEnquiry(txt);
      return;
    }
    const isFallback = FALLBACK_WORDS.some((w) => lower.includes(w));
    if (isFallback) {
      withTyping(() => {
        addBotMsg(
          "I'm here to help you with ZeAI Soft services, programs, and support. Please select an option below.",
          { type: 'quickButtons', items: menuAsQB(), onSelect: handleMenu },
        );
      }, 900);
      return;
    }
    if (/service|software|product|edtech|beauty|ai.*manu|infra/.test(lower)) {
      addUserMsg(txt);
      showServices();
    } else if (/train|program|skill|hackathon|kirthika|immersion|campus|learn/.test(lower)) {
      addUserMsg(txt);
      showTraining();
    } else if (/collab|partner|business.*enquir/.test(lower)) {
      addUserMsg(txt);
      showCollab();
    } else if (/enquir|question|help|support|contact|price|cost|about/.test(lower)) {
      addUserMsg(txt);
      showEnquiry();
    } else {
      withTyping(() => {
        addBotMsg(
          "I'm here to help you with ZeAI Soft services, programs, and support. Please select an option below.",
          { type: 'quickButtons', items: menuAsQB(), onSelect: handleMenu },
        );
      }, 900);
    }
  }

  // ─── Send ─────────────────────────────────────────────────────────────────────

  function doSend() {
    const txt = inputValue.trim();
    if (!txt) return;
    if (!enquiryModeRef.current) {
      addUserMsg(txt);
    }
    setInputValue('');
    handleFreeText(txt);
  }

  // ─── Init ─────────────────────────────────────────────────────────────────────

  function initChat() {
    withTyping(() => {
      addBotMsg(
        'Hi 👋 I am <strong>ZeNA</strong>, ZeAI Soft Assistant.<br>Welcome to <strong>ZeAI Soft!</strong> 🚀<br>How can I help you today?',
      );
      setTimeout(() => {
        withTyping(() => {
          addBotMsg('Please choose an option to get started:', {
            type: 'quickButtons',
            items: menuAsQB(),
            onSelect: handleMenu,
          });
        }, 700);
      }, 900);
    }, 1200);
  }

  // ─── Toggle ───────────────────────────────────────────────────────────────────

  function toggleChat() {
    const nextOpen = !isOpen;
    setIsOpen(nextOpen);
    if (nextOpen) {
      setShowNotif(false);
      if (!initializedRef.current) {
        initializedRef.current = true;
        setTimeout(initChat, 50);
      }
    }
  }

  return {
    messages,
    isTyping,
    isOpen,
    showNotif,
    inputValue,
    setInputValue,
    toggleChat,
    doSend,
  };
}
