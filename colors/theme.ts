export type Theme={
    background: string;
    textColor: string;
    primaryColor: string;
    secondaryColor: string;

};

export const themes: Record<"purple" | "blue", Theme> = {
    purple:{
        background: "#f3e8ff",
        textColor: "#4b5563",
        primaryColor: "#7c3aed",
        secondaryColor: "#a78bfa",
    },
    blue:{
        background: "#eff6ff",
        textColor: "#1e293b",
        primaryColor: "#3b82f6",
        secondaryColor: "#60a5fa",
    },
}
