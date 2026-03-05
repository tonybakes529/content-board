import { useState, useCallback } from 'react';
import axios from 'axios';
const API_URL = '/api';
export const useApi = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    // Boards
    const getBoards = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(`${API_URL}/boards`);
            return response.data;
        }
        catch (err) {
            setError(err.message);
            throw err;
        }
        finally {
            setLoading(false);
        }
    }, []);
    const createBoard = useCallback(async (name) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.post(`${API_URL}/boards`, { name });
            return response.data;
        }
        catch (err) {
            setError(err.message);
            throw err;
        }
        finally {
            setLoading(false);
        }
    }, []);
    const updateBoard = useCallback(async (id, name) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.patch(`${API_URL}/boards/${id}`, { name });
            return response.data;
        }
        catch (err) {
            setError(err.message);
            throw err;
        }
        finally {
            setLoading(false);
        }
    }, []);
    const deleteBoard = useCallback(async (id) => {
        setLoading(true);
        setError(null);
        try {
            await axios.delete(`${API_URL}/boards/${id}`);
        }
        catch (err) {
            setError(err.message);
            throw err;
        }
        finally {
            setLoading(false);
        }
    }, []);
    // Cards
    const getCards = useCallback(async (boardId) => {
        setLoading(true);
        setError(null);
        try {
            const url = boardId ? `${API_URL}/cards?board_id=${boardId}` : `${API_URL}/cards`;
            const response = await axios.get(url);
            return response.data;
        }
        catch (err) {
            setError(err.message);
            throw err;
        }
        finally {
            setLoading(false);
        }
    }, []);
    const createCard = useCallback(async (cardData) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.post(`${API_URL}/cards`, cardData);
            return response.data;
        }
        catch (err) {
            setError(err.message);
            throw err;
        }
        finally {
            setLoading(false);
        }
    }, []);
    const updateCard = useCallback(async (id, cardData) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.patch(`${API_URL}/cards/${id}`, cardData);
            return response.data;
        }
        catch (err) {
            setError(err.message);
            throw err;
        }
        finally {
            setLoading(false);
        }
    }, []);
    const deleteCard = useCallback(async (id) => {
        setLoading(true);
        setError(null);
        try {
            await axios.delete(`${API_URL}/cards/${id}`);
        }
        catch (err) {
            setError(err.message);
            throw err;
        }
        finally {
            setLoading(false);
        }
    }, []);
    const duplicateCard = useCallback(async (id) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.post(`${API_URL}/cards/${id}/duplicate`);
            return response.data;
        }
        catch (err) {
            setError(err.message);
            throw err;
        }
        finally {
            setLoading(false);
        }
    }, []);
    const getYoutubeTranscript = useCallback(async (url) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.post(`${API_URL}/transcripts/fetch`, { url });
            return response.data;
        }
        catch (err) {
            setError(err.message);
            throw err;
        }
        finally {
            setLoading(false);
        }
    }, []);
    return {
        loading,
        error,
        getBoards,
        createBoard,
        updateBoard,
        deleteBoard,
        getCards,
        createCard,
        updateCard,
        deleteCard,
        duplicateCard,
        getYoutubeTranscript,
    };
};
