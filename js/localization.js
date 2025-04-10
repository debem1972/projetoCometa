const routeButtons = document.getElementById("route-buttons");
const localizationSection = document.getElementById("localization");

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                routeButtons.classList.add("visible");
            } else {
                routeButtons.classList.remove("visible");
            }
        });
    },
    {
        root: null, // Usa a viewport como referência
        threshold: 0.1, // Dispara quando 10% da seção estiver visível
    }
);

observer.observe(localizationSection);



