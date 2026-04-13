pipeline {
    agent any

    tools {
        nodejs "node-24"
    }

    environment {
        PORT = "5173"
    }

    triggers {
        githubPush()
    }

    stages {

        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/ONESE-00/SolvKE-React.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm ci'
            }
        }

        stage('Build') {
            steps {
                bat 'npm run build'
            }
        }

        stage('Stop Previous App') {
            steps {
                bat 'taskkill /F /IM node.exe || exit 0'
            }
        }

        stage('Serve App') {
            steps {
                bat 'npx serve -s dist -l %PORT%'
            }
        }
    }
}