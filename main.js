/* eslint-env browser */
/* global crypto, FormData, setTimeout */
// AI Coding Hackathon front-end
// All state is in-memory for the session.

const initialProjects = () => [
  {
    id: crypto.randomUUID(),
    title: 'AI Mentor Chatbot',
    description:
      'A conversational mentor that answers stack questions and recommends docs with guardrails.',
    tags: ['JS', 'Node', 'OpenAI'],
    signups: 3,
  },
  {
    id: crypto.randomUUID(),
    title: 'Code Review Copilot',
    description:
      'Inline code review helper that flags risky diffs and suggests fixes.',
    tags: ['Python', 'LLM'],
    signups: 5,
  },
  {
    id: crypto.randomUUID(),
    title: 'DevOps Flow Analyzer',
    description:
      'Pipeline analyzer to detect bottlenecks and flaky steps using logs.',
    tags: ['Go', 'CI/CD'],
    signups: 2,
  },
];

const state = {
  userName: '',
  selectedProjectId: null,
  projects: initialProjects(),
};

const els = {};

document.addEventListener('DOMContentLoaded', () => {
  cacheElements();
  bindEvents();
  renderAll();
});

function cacheElements() {
  els.nameInput = document.getElementById('nameInput');
  els.nameError = document.getElementById('nameError');
  els.saveNameBtn = document.getElementById('saveNameBtn');
  els.userStatus = document.getElementById('userStatus');
  els.selectionStatus = document.getElementById('selectionStatus');
  els.projectGrid = document.getElementById('projectGrid');
  els.projectCount = document.getElementById('projectCount');
  els.emptyProjects = document.getElementById('emptyProjects');
  els.clearSelectionBtn = document.getElementById('clearSelectionBtn');
  els.resetAppBtn = document.getElementById('resetAppBtn');
  els.proposeForm = document.getElementById('proposeForm');
  els.proposeGuard = document.getElementById('proposeGuard');
  els.toastContainer = document.getElementById('toastContainer');

  els.modal = document.getElementById('projectModal');
  els.modalTitle = document.getElementById('modalTitle');
  els.modalDescription = document.getElementById('modalDescription');
  els.modalTags = document.getElementById('modalTags');
  els.modalCount = document.getElementById('modalCount');
  els.modalJoinBtn = document.getElementById('modalJoinBtn');
  els.modalLeaveBtn = document.getElementById('modalLeaveBtn');
  els.closeModalBtn = document.getElementById('closeModalBtn');
}

function bindEvents() {
  els.saveNameBtn.addEventListener('click', saveName);
  els.nameInput.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
      e.preventDefault();
      saveName();
    }
  });

  els.clearSelectionBtn.addEventListener('click', () => {
    if (!state.selectedProjectId) {
      return;
    }
    leaveProject();
  });

  els.resetAppBtn.addEventListener('click', () => {
    state.projects = initialProjects();
    state.selectedProjectId = null;
    addToast('Sample data reset.');
    renderAll();
  });

  els.proposeForm.addEventListener('submit', e => {
    e.preventDefault();
    if (!guardNameRequired()) {
      return;
    }
    handleProposal(new FormData(els.proposeForm));
  });

  els.closeModalBtn.addEventListener('click', closeModal);
  els.modal.addEventListener('click', e => {
    if (e.target === els.modal) {
      closeModal();
    }
  });
}

function renderAll() {
  renderUserStatus();
  renderSelectionStatus();
  renderProjects();
  renderGuards();
}

function renderUserStatus() {
  const name = state.userName.trim();
  els.userStatus.textContent = name
    ? `Signed in as ${name}`
    : 'Name required to join or propose.';
}

function renderSelectionStatus() {
  const selected = state.projects.find(p => p.id === state.selectedProjectId);
  if (!selected) {
    els.selectionStatus.textContent = 'No project selected.';
    els.clearSelectionBtn.disabled = true;
    return;
  }
  els.selectionStatus.textContent = `Your project: ${selected.title}`;
  els.clearSelectionBtn.disabled = false;
}

function renderProjects() {
  els.projectGrid.innerHTML = '';
  if (!state.projects.length) {
    els.emptyProjects.hidden = false;
    els.projectCount.textContent = '0 projects';
    return;
  }

  els.emptyProjects.hidden = true;
  els.projectCount.textContent = `${state.projects.length} project${state.projects.length === 1 ? '' : 's'}`;

  state.projects.forEach(project => {
    const card = document.createElement('article');
    card.className = 'card project-card';
    card.setAttribute('tabindex', '0');
    card.innerHTML = `
      <div class="card-top">
        <div>
          <p class="eyebrow">${project.tags.map(t => `<span class="tag">${escapeHtml(t)}</span>`).join(' ')}</p>
          <h3>${escapeHtml(project.title)}</h3>
          <p class="card-desc">${escapeHtml(project.description)}</p>
        </div>
        <div class="signup-count" aria-label="Signups">${project.signups} joined</div>
      </div>
      <div class="card-actions">
        <button class="btn ghost view-btn" data-id="${project.id}">View details</button>
        <button class="btn primary join-btn" data-id="${project.id}">${ctaLabel(project.id)}</button>
      </div>
    `;
    const joinBtn = card.querySelector('.join-btn');
    joinBtn.addEventListener('click', () => joinProject(project.id));

    const viewBtn = card.querySelector('.view-btn');
    viewBtn.addEventListener('click', () => openModal(project.id));

    card.addEventListener('keydown', e => {
      if (e.key === 'Enter') {
        openModal(project.id);
      }
    });

    els.projectGrid.appendChild(card);
  });
}

function renderGuards() {
  const hasName = Boolean(state.userName.trim());
  els.proposeGuard.textContent = hasName
    ? ''
    : 'Enter your name above to propose an idea.';
  els.proposeForm.querySelector('button[type="submit"]').disabled = !hasName;
  document.querySelectorAll('.join-btn').forEach(btn => {
    btn.disabled = !hasName;
  });
}

function ctaLabel(projectId) {
  if (!state.userName.trim()) {
    return 'Join (name required)';
  }
  if (state.selectedProjectId === projectId) {
    return 'Your project';
  }
  if (state.selectedProjectId) {
    return 'Switch to this';
  }
  return 'Join project';
}

function saveName() {
  const value = els.nameInput.value.trim();
  if (!value) {
    els.nameError.textContent = 'Please enter your name.';
    els.nameInput.focus();
    return;
  }
  els.nameError.textContent = '';
  state.userName = value;
  addToast(`Welcome, ${value}!`);
  renderAll();
}

function guardNameRequired() {
  if (state.userName.trim()) {
    return true;
  }
  els.nameError.textContent = 'Name is required for this action.';
  els.nameInput.focus();
  addToast('Enter your name to continue.');
  return false;
}

function joinProject(projectId) {
  if (!guardNameRequired()) {
    return;
  }
  if (state.selectedProjectId === projectId) {
    addToast('You are already on this project.');
    return;
  }

  const nextProjects = state.projects.map(p => {
    if (p.id === projectId) {
      return { ...p, signups: p.signups + 1 };
    }
    if (p.id === state.selectedProjectId) {
      return { ...p, signups: Math.max(0, p.signups - 1) };
    }
    return p;
  });

  state.projects = nextProjects;
  const prevSelection = state.selectedProjectId;
  state.selectedProjectId = projectId;

  const nextTitle =
    state.projects.find(p => p.id === projectId)?.title ?? 'project';
  addToast(
    prevSelection ? `Switched to ${nextTitle}.` : `Joined ${nextTitle}.`
  );
  renderAll();
  updateModalIfOpen(projectId);
}

function leaveProject() {
  if (!state.selectedProjectId) {
    return;
  }
  const prevId = state.selectedProjectId;
  state.projects = state.projects.map(p =>
    p.id === prevId ? { ...p, signups: Math.max(0, p.signups - 1) } : p
  );
  state.selectedProjectId = null;
  addToast('You left your project.');
  renderAll();
  updateModalIfOpen(prevId);
}

function handleProposal(formData) {
  const title = (formData.get('title') || '').trim();
  const description = (formData.get('description') || '').trim();
  const tagsRaw = (formData.get('tags') || '').trim();

  clearFieldErrors();

  const errors = {};
  if (!title) {
    errors.title = 'Title is required.';
  }
  if (!description) {
    errors.description = 'Description is required.';
  }
  if (Object.keys(errors).length) {
    showFieldErrors(errors);
    return;
  }

  const tags = tagsRaw
    ? tagsRaw
        .split(',')
        .map(t => t.trim())
        .filter(Boolean)
    : [];

  const newProject = {
    id: crypto.randomUUID(),
    title,
    description,
    tags,
    signups: 0,
  };

  state.projects = [newProject, ...state.projects];
  els.proposeForm.reset();
  addToast('Project proposed and added.');
  renderAll();
}

function openModal(projectId) {
  const project = state.projects.find(p => p.id === projectId);
  if (!project) {
    return;
  }
  els.modal.dataset.projectId = projectId;
  els.modalTitle.textContent = project.title;
  els.modalDescription.textContent = project.description;
  els.modalTags.innerHTML = project.tags
    .map(t => `<span class="tag">${escapeHtml(t)}</span>`)
    .join(' ');
  els.modalCount.textContent = `${project.signups} signed up`;

  els.modalJoinBtn.textContent = ctaLabel(projectId);
  els.modalJoinBtn.disabled = !state.userName.trim();
  els.modalJoinBtn.onclick = () => joinProject(projectId);

  els.modalLeaveBtn.onclick = leaveProject;
  els.modalLeaveBtn.disabled = !state.selectedProjectId;

  els.modal.hidden = false;
  els.modal.focus();
}

function closeModal() {
  els.modal.hidden = true;
  els.modal.dataset.projectId = '';
}

function updateModalIfOpen(projectId) {
  const openId = els.modal.dataset.projectId;
  if (openId === projectId) {
    openModal(projectId);
  }
}

function showFieldErrors(errors) {
  Object.entries(errors).forEach(([field, message]) => {
    const target = els.proposeForm.querySelector(`[data-error-for="${field}"]`);
    if (target) {
      target.textContent = message;
    }
  });
}

function clearFieldErrors() {
  els.proposeForm.querySelectorAll('.form-error').forEach(el => {
    el.textContent = '';
  });
}

function addToast(message) {
  const id = crypto.randomUUID();
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  toast.dataset.id = id;
  els.toastContainer.appendChild(toast);
  setTimeout(() => toast.classList.add('visible'), 10);
  setTimeout(() => dismissToast(id), 3500);
}

function dismissToast(id) {
  const toast = els.toastContainer.querySelector(`[data-id="${id}"]`);
  if (!toast) {
    return;
  }
  toast.classList.remove('visible');
  setTimeout(() => toast.remove(), 200);
}

function escapeHtml(str) {
  return str.replace(/[&<>"']/g, char => {
    const map = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;',
    };
    return map[char];
  });
}
