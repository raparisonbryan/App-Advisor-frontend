'use client';

import { useState, useEffect, useRef } from "react";
import styles from "./SearchBar.module.scss";
import InputSearch from "@/components/Atoms/Input/InputSearch";
import { searchOutils } from "@/services/OutilService";
import { Outil } from "@/types/Outil";
import { useRouter } from "next/navigation";
import {Flex} from "@radix-ui/themes";
import Img from "@/components/Atoms/Img/Img";

const SearchBar = () => {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState<Outil[]>([]);
    const [isSearching, setIsSearching] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const delayDebounceFn = setTimeout(async () => {
            if (searchQuery.trim().length >= 2) {
                setIsSearching(true);
                try {
                    const results = await searchOutils(searchQuery);
                    setSearchResults(results);
                    setShowDropdown(results.length > 0);
                } catch (error) {
                    console.error('Erreur lors de la recherche:', error);
                    setSearchResults([]);
                    setShowDropdown(false);
                } finally {
                    setIsSearching(false);
                }
            } else {
                setSearchResults([]);
                setShowDropdown(false);
            }
        }, 300);

        return () => clearTimeout(delayDebounceFn);
    }, [searchQuery]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node) &&
                inputRef.current && !inputRef.current.contains(event.target as Node)) {
                setShowDropdown(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setShowDropdown(false);
            }
        };

        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    const handleOutilClick = (outil: Outil) => {
        setShowDropdown(false);
        setSearchQuery("");
        router.push(`/outil/${outil._id}`);
    };

    const handleInputFocus = () => {
        if (searchResults.length > 0) {
            setShowDropdown(true);
        }
    };

    return (
        <div className={styles.search_container}>
            <InputSearch 
                ref={inputRef}
                type="text" 
                placeholder="Recherchez votre framework, outil, ..."
                value={searchQuery}
                onChange={handleInputChange}
                onFocus={handleInputFocus}
            />
            
            {isSearching && (
                <div className={styles.loading_indicator}>
                    <span>Recherche...</span>
                </div>
            )}

            {showDropdown && searchResults.length > 0 && (
                <div ref={dropdownRef} className={styles.dropdown}>
                    {searchResults.map((outil) => (
                        <div 
                            key={outil._id} 
                            className={styles.dropdown_item}
                            onClick={() => handleOutilClick(outil)}
                        >
                            <div className={styles.outil_info}>
                                <Flex align="center" gap="5px">
                                    <Img src={outil.imageURL} height="30px" width="30px" objectFit="contain"/>
                                    <div className={styles.outil_name}>{outil.name}</div>
                                </Flex>
                                <div className={styles.outil_description}>
                                    {outil.description.length > 100 
                                        ? `${outil.description.substring(0, 100)}...` 
                                        : outil.description
                                    }
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SearchBar;