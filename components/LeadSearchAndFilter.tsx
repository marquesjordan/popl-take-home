import React, { useEffect, useState, useCallback } from 'react';
import { View, StyleSheet, Animated, ScrollView, TouchableOpacity } from 'react-native';
import { Searchbar, Chip, Text, IconButton } from 'react-native-paper';
import { Lead } from '../types';
import debounce from 'lodash/debounce';

interface LeadSearchAndFilterProps {
    leads: Lead[];
    onSearchChange: (query: string) => void;
    onTagsChange: (tags: string[]) => void;
    selectedTags: string[];
}

export default function LeadSearchAndFilter({
    leads,
    onSearchChange,
    onTagsChange,
    selectedTags
}: LeadSearchAndFilterProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const [availableTags, setAvailableTags] = useState<string[]>([]);
    const [isTagsVisible, setIsTagsVisible] = useState(false);
    const [animation] = useState(new Animated.Value(0));

    useEffect(() => {
        const processedTags = Array.from(
            new Set(
                leads
                    .flatMap(lead => lead.tags)
                    .map(tag => tag ? tag : '')
                    .filter(tag => tag.length > 0)
            )
        ).sort();
        setAvailableTags(processedTags);
    }, [leads]);

    useEffect(() => {
        Animated.timing(animation, {
            toValue: isTagsVisible ? 1 : 0,
            duration: 300,
            useNativeDriver: false,
        }).start();
    }, [isTagsVisible]);

    const debouncedSearch = useCallback(
        debounce((query: string) => {
            onSearchChange(query);
        }, 300),
        [onSearchChange]
    );

    const handleSearch = (query: string) => {
        setSearchQuery(query);
        debouncedSearch(query);
    };

    const handleTagPress = (tag: string) => {
        const newSelectedTags = selectedTags.includes(tag)
            ? selectedTags.filter(t => t !== tag)
            : [...selectedTags, tag];
        onTagsChange(newSelectedTags);
    };

    const tagsHeight = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 200],
    });

    return (
        <View style={styles.container}>
            <View style={styles.searchContainer}>
                <Searchbar
                    placeholder="Search leads..."
                    onChangeText={handleSearch}
                    value={searchQuery}
                    style={styles.searchBar}
                />
                <IconButton
                    icon={isTagsVisible ? "chevron-up" : "chevron-down"}
                    onPress={() => setIsTagsVisible(!isTagsVisible)}
                    style={styles.toggleButton}
                />
            </View>
            <Animated.View style={[styles.tagsContainer, { maxHeight: tagsHeight }]}>
                <Text style={styles.tagsLabel}>Filter by tags:</Text>
                <ScrollView style={styles.tagsList}>
                    {availableTags.map(tag => (
                        <Chip
                            key={tag}
                            selected={selectedTags.includes(tag)}
                            onPress={() => handleTagPress(tag)}
                            style={styles.tag}
                            mode={selectedTags.includes(tag) ? 'flat' : 'outlined'}
                        >
                            {tag}
                        </Chip>
                    ))}
                </ScrollView>
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        paddingBottom: 8,
    },
    searchBar: {
        flex: 1,
        marginRight: 8,
    },
    toggleButton: {
        margin: 0,
    },
    tagsContainer: {
        overflow: 'hidden',
        paddingHorizontal: 16,
        paddingBottom: 16,
    },
    tagsLabel: {
        marginBottom: 8,
        fontSize: 16,
        fontWeight: '500',
    },
    tagsList: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },
    tag: {
        marginBottom: 8
    },
}); 