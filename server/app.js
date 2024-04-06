// const express = require('express');
import express from 'express';
import { Config as config } from './config/config.js'

const app = express();

// Start the server
app.listen(config.PORT, config.HOST, () => {
    console.log(`Server is running on port ${config.PORT}`);
});