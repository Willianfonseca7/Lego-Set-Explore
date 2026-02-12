import heroImg from '../img/hero_img.jpg';

export default function HeroSection() {
    return (
        <div className="hero-section container mx-auto px-4 py-10 flex justify-center">
            <img src={heroImg} alt="LEGO Set Explorer" className="hero-image w-full max-w-full object-cover object-center block" />
        </div>
    );
}