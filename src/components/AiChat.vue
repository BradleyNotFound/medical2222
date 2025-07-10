<template>
  <div class="ai-chat-container">
    <!-- 聊天按钮 -->
    <div 
      class="chat-toggle-btn" 
      @click="toggleChat"
      v-show="!isOpen"
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2ZM20 16H5.17L4 17.17V4H20V16Z" fill="white"/>
        <circle cx="8" cy="10" r="1" fill="white"/>
        <circle cx="12" cy="10" r="1" fill="white"/>
        <circle cx="16" cy="10" r="1" fill="white"/>
      </svg>
    </div>

    <!-- 聊天窗口 -->
    <div class="chat-window" v-show="isOpen">
      <!-- 聊天头部 -->
      <div class="chat-header">
        <div class="chat-title">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1L9 7V9C9 10.1 9.9 11 11 11V22H13V11C14.1 11 15 10.1 15 9Z" fill="#409EFF"/>
          </svg>
          <span>AI助手</span>
        </div>
        <button class="close-btn" @click="toggleChat">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z" fill="#909399"/>
          </svg>
        </button>
      </div>

      <!-- 聊天消息区域 -->
      <div class="chat-messages" ref="messagesContainer">
        <div 
          v-for="(message, index) in messages" 
          :key="index" 
          :class="['message', message.type]"
        >
          <div class="message-content">
            <div class="message-text">{{ message.text }}</div>
            <div class="message-time">{{ formatTime(message.timestamp) }}</div>
          </div>
        </div>
        <div v-if="isLoading" class="message ai">
          <div class="message-content">
            <div class="typing-indicator">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
      </div>

      <!-- 输入区域 -->
      <div class="chat-input">
        <div class="input-wrapper">
          <textarea 
            v-model="inputMessage"
            placeholder="输入您的问题..."
            @keydown.enter.exact.prevent="sendMessage"
            @keydown.ctrl.enter.exact="inputMessage += '\n'"
            rows="1"
            ref="messageInput"
          ></textarea>
          <button 
            class="send-btn" 
            @click="sendMessage"
            :disabled="!inputMessage.trim() || isLoading"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2.01 21L23 12L2.01 3L2 10L17 12L2 14L2.01 21Z" fill="currentColor"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'AiChat',
  data() {
    return {
      isOpen: false,
      inputMessage: '',
      isLoading: false,
      messages: [
        {
          type: 'ai',
          text: '您好！我是AI助手，有什么可以帮助您的吗？',
          timestamp: new Date()
        }
      ]
    }
  },
  methods: {
    toggleChat() {
      this.isOpen = !this.isOpen
      if (this.isOpen) {
        this.$nextTick(() => {
          this.scrollToBottom()
          this.$refs.messageInput?.focus()
        })
      }
    },
    
    async sendMessage() {
      if (!this.inputMessage.trim() || this.isLoading) return
      
      const userMessage = this.inputMessage.trim()
      this.inputMessage = ''
      
      // 添加用户消息
      this.messages.push({
        type: 'user',
        text: userMessage,
        timestamp: new Date()
      })
      
      this.scrollToBottom()
      this.isLoading = true
      
      try {
        const response = await this.callDeepSeekAPI(userMessage)
        
        // 添加AI回复
        this.messages.push({
          type: 'ai',
          text: response,
          timestamp: new Date()
        })
      } catch (error) {
        console.error('AI API调用失败:', error)
        this.messages.push({
          type: 'ai',
          text: '抱歉，我现在无法回答您的问题，请稍后再试。',
          timestamp: new Date()
        })
      } finally {
        this.isLoading = false
        this.scrollToBottom()
      }
    },
    
    async callDeepSeekAPI(message) {
      // 这里需要配置您的DeepSeek API Key
      const API_KEY = process.env.VUE_APP_DEEPSEEK_API_KEY || 'your-deepseek-api-key'
      const API_URL = 'https://api.deepseek.com/v1/chat/completions'
      
      const response = await axios.post(API_URL, {
        model: 'deepseek-chat',
        messages: [
          {
            role: 'system',
            content: '你是一个专业的医疗管理系统AI助手，专门帮助用户解答关于医疗管理、医院运营、药品管理等相关问题。请用简洁、专业的语言回答用户的问题。'
          },
          {
            role: 'user',
            content: message
          }
        ],
        temperature: 0.7,
        max_tokens: 1000
      }, {
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json'
        }
      })
      
      return response.data.choices[0].message.content
    },
    
    scrollToBottom() {
      this.$nextTick(() => {
        const container = this.$refs.messagesContainer
        if (container) {
          container.scrollTop = container.scrollHeight
        }
      })
    },
    
    formatTime(timestamp) {
      return new Date(timestamp).toLocaleTimeString('zh-CN', {
        hour: '2-digit',
        minute: '2-digit'
      })
    }
  }
}
</script>

<style scoped>
.ai-chat-container {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 9999;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.chat-toggle-btn {
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #409EFF, #67C23A);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(64, 158, 255, 0.4);
  transition: all 0.3s ease;
}

.chat-toggle-btn:hover {
  transform: scale(1.1);
  box-shadow: 0 6px 16px rgba(64, 158, 255, 0.6);
}

.chat-window {
  width: 350px;
  height: 500px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border: 1px solid #e4e7ed;
}

.chat-header {
  background: linear-gradient(135deg, #409EFF, #67C23A);
  color: white;
  padding: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.chat-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
  font-size: 16px;
}

.close-btn {
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  transition: background-color 0.2s;
}

.close-btn:hover {
  background-color: rgba(255, 255, 255, 0.2);
}

.chat-messages {
  flex: 1;
  padding: 16px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.message {
  display: flex;
  max-width: 80%;
}

.message.user {
  align-self: flex-end;
}

.message.ai {
  align-self: flex-start;
}

.message-content {
  background: #f5f7fa;
  padding: 12px 16px;
  border-radius: 18px;
  position: relative;
}

.message.user .message-content {
  background: #409EFF;
  color: white;
}

.message-text {
  line-height: 1.4;
  word-wrap: break-word;
  margin-bottom: 4px;
}

.message-time {
  font-size: 11px;
  opacity: 0.7;
  text-align: right;
}

.typing-indicator {
  display: flex;
  gap: 4px;
  align-items: center;
}

.typing-indicator span {
  width: 6px;
  height: 6px;
  background: #909399;
  border-radius: 50%;
  animation: typing 1.4s infinite;
}

.typing-indicator span:nth-child(2) {
  animation-delay: 0.2s;
}

.typing-indicator span:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes typing {
  0%, 60%, 100% {
    transform: translateY(0);
  }
  30% {
    transform: translateY(-10px);
  }
}

.chat-input {
  padding: 16px;
  border-top: 1px solid #e4e7ed;
  background: #fafafa;
}

.input-wrapper {
  display: flex;
  gap: 8px;
  align-items: flex-end;
}

.input-wrapper textarea {
  flex: 1;
  border: 1px solid #dcdfe6;
  border-radius: 20px;
  padding: 12px 16px;
  resize: none;
  outline: none;
  font-family: inherit;
  font-size: 14px;
  line-height: 1.4;
  max-height: 100px;
  transition: border-color 0.2s;
}

.input-wrapper textarea:focus {
  border-color: #409EFF;
}

.send-btn {
  width: 40px;
  height: 40px;
  background: #409EFF;
  color: white;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.send-btn:hover:not(:disabled) {
  background: #337ecc;
  transform: scale(1.05);
}

.send-btn:disabled {
  background: #c0c4cc;
  cursor: not-allowed;
  transform: none;
}

/* 滚动条样式 */
.chat-messages::-webkit-scrollbar {
  width: 4px;
}

.chat-messages::-webkit-scrollbar-track {
  background: #f1f1f1;
}

.chat-messages::-webkit-scrollbar-thumb {
  background: #c0c4cc;
  border-radius: 2px;
}

.chat-messages::-webkit-scrollbar-thumb:hover {
  background: #909399;
}
</style>