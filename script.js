document.addEventListener('DOMContentLoaded', function() {
    // Datos de la malla curricular (igual que antes)
    const curriculum = [...]; // Mantener el mismo array de datos del curriculum

    // Estado de la aplicación
    const state = {
        completedCourses: JSON.parse(localStorage.getItem('completedCourses')) || [],
        viewMode: 'semester'
    };

    // Elementos del DOM
    const yearsContainer = document.getElementById('years-container');
    const progressBar = document.getElementById('progress-bar');
    const progressText = document.getElementById('progress-text');
    const toggleViewBtn = document.getElementById('toggle-view');
    const resetBtn = document.getElementById('reset-btn');
    const courseModal = document.getElementById('course-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalSemester = document.getElementById('modal-semester');
    const modalRequirements = document.getElementById('modal-requirements');
    const modalUnlocks = document.getElementById('modal-unlocks');
    const modalStatus = document.getElementById('modal-status');
    const toggleCourseBtn = document.getElementById('toggle-course');
    const closeModalBtn = document.querySelector('.close-modal');

    // Variables temporales
    let currentCourse = null;

    // Inicializar la aplicación
    function init() {
        renderYears();
        updateProgress();
        setupEventListeners();
    }

    // Renderizar por años y semestres
    function renderYears() {
        yearsContainer.innerHTML = '';
        
        // Agrupar por años
        const years = {};
        curriculum.forEach(semesterData => {
            if (!years[semesterData.year]) {
                years[semesterData.year] = [];
            }
            years[semesterData.year].push(semesterData);
        });
        
        // Crear columnas por año
        for (const [year, semesters] of Object.entries(years)) {
            const yearColumn = document.createElement('div');
            yearColumn.className = 'year-column';
            
            const titleEl = document.createElement('h3');
            titleEl.className = 'year-title';
            titleEl.textContent = `Año ${year}`;
            yearColumn.appendChild(titleEl);
            
            // Agregar semestres
            semesters.forEach(semesterData => {
                const semesterEl = document.createElement('div');
                semesterEl.className = 'semester';
                
                const semesterTitleEl = document.createElement('h4');
                semesterTitleEl.className = 'semester-title';
                semesterTitleEl.textContent = `Semestre ${semesterData.semester}`;
                semesterEl.appendChild(semesterTitleEl);
                
                const coursesListEl = document.createElement('div');
                coursesListEl.className = 'courses-list';
                
                semesterData.courses.forEach(course => {
                    const courseEl = document.createElement('div');
                    courseEl.className = 'course';
                    
                    // Verificar si el curso está completado
                    const isCompleted = state.completedCourses.includes(course.code);
                    if (isCompleted) {
                        courseEl.classList.add('completed');
                    }
                    
                    // Verificar si el curso está bloqueado
                    const isLocked = !isCourseUnlocked(course);
                    if (isLocked && !isCompleted) {
                        courseEl.classList.add('locked');
                    }
                    
                    courseEl.innerHTML = `
                        <div class="course-name">${course.name}</div>
                        <div class="course-code">${course.code}</div>
                    `;
                    
                    // Solo agregar evento click si no está bloqueado o ya está completado
                    if (!isLocked || isCompleted) {
                        courseEl.addEventListener('click', () => openCourseModal(course, semesterData));
                    } else {
                        courseEl.title = "Curso bloqueado - Completa los requisitos primero";
                    }
                    
                    coursesListEl.appendChild(courseEl);
                });
                
                semesterEl.appendChild(coursesListEl);
                yearColumn.appendChild(semesterEl);
            });
            
            yearsContainer.appendChild(yearColumn);
        }
    }

    // Verificar si un curso está desbloqueado
    function isCourseUnlocked(course) {
        // Los talleres de especialización tienen requisitos especiales
        if (course.code === 'TEP101' || course.code === 'TEP102') {
            return areAllCoursesCompleted();
        }
        
        if (course.requirements.length === 0) return true;
        
        return course.requirements.every(req => 
            state.completedCourses.includes(req)
        );
    }

    // Verificar si todos los cursos hasta el semestre 8 están completados (para TEP)
    function areAllCoursesCompleted() {
        const coursesUntilSemester8 = [];
        
        curriculum.forEach(semester => {
            if (semester.semester <= 8) {
                semester.courses.forEach(course => {
                    coursesUntilSemester8.push(course.code);
                });
            }
        });
        
        return coursesUntilSemester8.every(code => 
            state.completedCourses.includes(code)
        );
    }

    // Abrir el modal del curso
    function openCourseModal(course, semesterData) {
        currentCourse = course;
        
        modalTitle.textContent = course.name;
        modalSemester.textContent = `Año ${semesterData.year} - Semestre ${semesterData.semester}`;
        
        // Mostrar requisitos
        if (course.requirements.length > 0) {
            const reqNames = course.requirements.map(code => {
                const reqCourse = findCourseByCode(code);
                return reqCourse ? reqCourse.name : code;
            });
            modalRequirements.textContent = reqNames.join(', ');
        } else {
            modalRequirements.textContent = 'Ninguno';
        }
        
        // Mostrar cursos que desbloquea
        if (course.unlocks.length > 0) {
            const unlockNames = course.unlocks.map(code => {
                const unlockCourse = findCourseByCode(code);
                return unlockCourse ? unlockCourse.name : code;
            });
            modalUnlocks.textContent = unlockNames.join(', ');
        } else {
            modalUnlocks.textContent = 'Ninguno';
        }
        
        // Mostrar estado
        const isCompleted = state.completedCourses.includes(course.code);
        modalStatus.textContent = isCompleted ? 'Aprobado' : 'Pendiente';
        modalStatus.style.color = isCompleted ? 'var(--completed-color)' : '#ff6b9d';
        
        // Configurar botón
        toggleCourseBtn.textContent = isCompleted ? 'Marcar como pendiente' : 'Marcar como aprobado';
        toggleCourseBtn.style.backgroundColor = isCompleted ? '#f44336' : 'var(--primary-color)';
        
        // Mostrar modal
        courseModal.classList.add('active');
    }

    // Encontrar curso por código
    function findCourseByCode(code) {
        for (const semester of curriculum) {
            for (const course of semester.courses) {
                if (course.code === code) {
                    return course;
                }
            }
        }
        return null;
    }

    // Actualizar barra de progreso
    function updateProgress() {
        const totalCourses = curriculum.reduce((acc, semester) => acc + semester.courses.length, 0);
        const completedCount = state.completedCourses.length;
        const percentage = Math.round((completedCount / totalCourses) * 100);
        
        progressBar.style.width = `${percentage}%`;
        progressText.textContent = `${percentage}% completado (${completedCount}/${totalCourses} cursos)`;
    }

    // Configurar event listeners
    function setupEventListeners() {
        // Cerrar modal
        closeModalBtn.addEventListener('click', () => {
            courseModal.classList.remove('active');
        });
        
        // Cerrar modal al hacer clic fuera
        courseModal.addEventListener('click', (e) => {
            if (e.target === courseModal) {
                courseModal.classList.remove('active');
            }
        });
        
        // Alternar estado del curso
        toggleCourseBtn.addEventListener('click', toggleCourseStatus);
        
        // Cambiar vista (puedes implementar esto si lo necesitas)
        toggleViewBtn.addEventListener('click', () => {
            alert('Actualmente solo disponible vista por años');
        });
        
        // Reiniciar progreso
        resetBtn.addEventListener('click', () => {
            if (confirm('¿Estás seguro de que quieres reiniciar todo tu progreso?')) {
                state.completedCourses = [];
                localStorage.setItem('completedCourses', JSON.stringify(state.completedCourses));
                renderYears();
                updateProgress();
            }
        });
    }

    // Función para alternar el estado del curso
    function toggleCourseStatus() {
        if (!currentCourse) return;
        
        const index = state.completedCourses.indexOf(currentCourse.code);
        
        if (index === -1) {
            // Agregar a completados
            state.completedCourses.push(currentCourse.code);
        } else {
            // Quitar de completados
            state.completedCourses.splice(index, 1);
        }
        
        // Guardar en localStorage
        localStorage.setItem('completedCourses', JSON.stringify(state.completedCourses));
        
        // Actualizar UI
        renderYears();
        updateProgress();
        courseModal.classList.remove('active');
    }

    // Iniciar la aplicación
    init();
});
