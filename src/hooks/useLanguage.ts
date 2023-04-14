
import UnitedKingdomFlag from '../images/United-KingdomFlag.png'
import FranceFlag from '../images/FranceFlag.png'
import ItalyFlag from '../images/ItalyFlag.png'
import SpainFlag from '../images/SpainFLag.png'
import GermanyFlag from '../images/GermanyFlag.png'
import { useState } from 'react'
import { findDOMNode } from 'react-dom'

type ChangeLanguage = (lang: string) => void

export interface Lang {
    lang: string
    image: string
    title: string
    placeholderText: string
}

export const Langs: Lang[] = [{
    lang: "en",
    image: `${UnitedKingdomFlag}`,
    title: "International and National Weather",
    placeholderText: "Search your city..."
}, {
    lang: "fr",
    image: `${FranceFlag}`,
    title: "Météo internationale et nationale",
    placeholderText: "Rechercher votre ville..."
}, {
    lang: "it",
    image: `${ItalyFlag}`,
    title: "Meteo internazionale e nazionale",
    placeholderText: "Cerca la tua città..."
}, {
    lang: "es",
    image: `${SpainFlag}`,
    title: "Clima Internacional y Nacional",
    placeholderText: "Busca tu ciudad..."
}, {
    lang: "de",
    image: `${GermanyFlag}`,
    title: "Internationales und nationales Wetter",
    placeholderText: "Suche deine Stadt"

}]

export interface UseLanguageResult {
    lang: string
    image?: string
    title?: string
    otherLangs: Lang[]
    changeLanguage: ChangeLanguage
    placeholderText?: string
}

export const useLanguage = (): UseLanguageResult => {

    const [selectedLanguage, setSelectedLanguage] = useState("en")


    function changeLanguage(lang: string) {
        setSelectedLanguage(lang)
    }

    const languageProps = Langs.find(m => m.lang === selectedLanguage)
    return {
        lang: selectedLanguage,
        image: languageProps?.image,
        title: languageProps?.title,
        otherLangs: Langs.filter(m => m.lang !== selectedLanguage),
        changeLanguage: changeLanguage,
        placeholderText: languageProps?.placeholderText,
    }

}