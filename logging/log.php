<?php

  class CustomLogger {
    private $logFile;

    public function __construct($logFile = 'log.log') {
        $this->logFile = $logFile;
    }

    private function log($level, $message) {
        echo "It's going in here";
        $timestamp = date('Y-m-d H:i:s');
        $logEntry = "[$timestamp] [$level] $message" . PHP_EOL;
        file_put_contents($this->logFile, $logEntry, FILE_APPEND);
    }

    public function logDebug($message) {
        $this->log('DEBUG', $message);
    }

    public function logInfo($message) {
        $this->log('INFO', $message);
    }

    public function logWarning($message) {
        $this->log('WARNING', $message);
    }

    public function logError($message) {
        $this->log('ERROR', $message);
    }

    public function logFatal($message) {
        $this->log('FATAL', $message);
    }
  }
?>