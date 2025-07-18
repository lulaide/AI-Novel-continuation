# Usage Guide - AI Novel Continuation Tool

## Quick Start

### 1. Setup and Installation

#### Backend Setup
```bash
cd back
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python main.py
```

#### Frontend Setup
```bash
cd front
npm install
npm run dev
```

### 2. Access the Application
- Open your browser and go to `http://localhost:3000`
- The backend API will be running on `http://localhost:5000`

## Step-by-Step Usage

### Step 1: Configure OpenAI API

1. Click the gear icon (⚙️) in the bottom right corner
2. Fill in your OpenAI API configuration:
   - **API Key**: Your OpenAI API key (e.g., `sk-xxx...`)
   - **Base URL**: API endpoint (default: `https://api.openai.com/v1`)
   - **Model**: AI model to use (default: `gpt-3.5-turbo`)
3. Click "保存设置" (Save Settings)
4. Wait for the success message

### Step 2: Input Your Novel Beginning

1. In the main text area, type your novel opening
2. Example:
   ```
   在一个充满魔法的古老王国里，年轻的法师艾米丽发现了一个神秘的预言。
   预言说，只有找到失落的光明法杖，才能拯救即将被黑暗吞噬的王国。
   艾米丽决定踏上这个危险的旅程，但她不知道前方等待着她的是什么...
   ```

### Step 3: Generate Endings

1. Click the arrow button (➤) or refresh button (🔄) to generate endings
2. Wait for the AI to generate 4 different possible endings
3. Review the generated endings in the grid below

### Step 4: Select an Ending

1. Click on one of the 4 generated endings to select it
2. The selected ending will be highlighted with a border
3. You can change your selection by clicking on a different ending

### Step 5: Choose Length and Continue

1. Select your preferred continuation length:
   - **短篇** (Short): ~300 characters
   - **中篇** (Medium): ~500 characters  
   - **长篇** (Long): ~700 characters
2. Click "生成续写" (Generate Continuation)
3. Wait for the AI to generate the continuation
4. The continuation will be automatically appended to your original text

### Step 6: Iterate and Refine

1. You can generate new endings based on the updated content
2. Continue the cycle of ending generation and continuation
3. Build your novel step by step

## Example Workflow

### Example 1: Fantasy Novel

**Input:**
```
在遥远的精灵王国，年轻的公主艾丽娅发现了一个古老的魔法书。
书中记载着一个强大的咒语，能够让死去的人重新获得生命。
但是这个咒语需要付出巨大的代价...
```

**Generated Endings:**
1. 艾丽娅决定不使用咒语，选择接受失去的痛苦，学会珍惜当下。
2. 艾丽娅使用咒语复活了她的母亲，但发现复活的并不是真正的母亲。
3. 艾丽娅发现咒语的代价是她自己的生命，她必须做出最终的选择。
4. 艾丽娅找到了修改咒语的方法，成功复活了母亲且没有付出代价。

**Selected Ending:** 艾丽娅发现咒语的代价是她自己的生命，她必须做出最终的选择。

**Generated Continuation:**
```
艾丽娅颤抖着手翻动着魔法书的页面，咒语的真相让她的心如刀割。
她深爱的母亲已经离开了三年，而现在她终于有机会再次见到她。
但是，这个机会需要用她自己的生命来换取。

艾丽娅想起了母亲生前的话："我的孩子，生命是最宝贵的礼物，
不要为了过去而放弃未来。"她闭上眼睛，感受着母亲的爱意。
最终，她轻轻合上了魔法书，选择了生命，选择了未来。
```

### Example 2: Modern Romance

**Input:**
```
林晓在咖啡厅里等待着她的前男友张瑞。
三年前，他们因为误会而分手，现在张瑞主动约她见面。
林晓不知道该期待什么，也不知道自己的心情...
```

**Generated Endings:**
1. 张瑞道歉并解释了当年的误会，他们重新开始了。
2. 林晓发现自己已经放下了过去，选择了新的生活。
3. 他们成为了朋友，但不再是恋人。
4. 张瑞透露了一个秘密，改变了林晓对过去的看法。

## Advanced Features

### Custom API Endpoints

You can use OpenAI-compatible APIs by changing the Base URL:

**Examples:**
- Azure OpenAI: `https://your-resource.openai.azure.com/`
- Local AI: `http://localhost:11434/v1`
- Other providers: Various OpenAI-compatible endpoints

### Multiple Continuations

1. After generating a continuation, you can generate new endings based on the extended content
2. This allows for branching storylines and multiple plot developments
3. Create complex narratives with multiple story arcs

### Length Optimization

**Tips for different lengths:**
- **Short (300字)**: Good for quick plot developments
- **Medium (500字)**: Ideal for character development and scene description
- **Long (700字)**: Perfect for detailed world-building and complex scenes

## Troubleshooting

### Common Issues

**1. API Configuration Errors**
- **Error**: "无效的 OpenAI API 配置"
- **Solution**: Check your API key, base URL, and model name
- **Tip**: Test with a simple model like `gpt-3.5-turbo` first

**2. Generation Fails**
- **Error**: "生成出错！请检查 OpenAI API 配置"
- **Solution**: Verify your API key has sufficient credits
- **Tip**: Check OpenAI's status page for service issues

**3. Empty or Invalid Content**
- **Error**: "内容不能为空"
- **Solution**: Ensure you have written some novel content before generating endings
- **Tip**: Write at least 2-3 sentences for better results

**4. Network Issues**
- **Error**: Network or connection errors
- **Solution**: Check your internet connection and API endpoint accessibility
- **Tip**: Try switching to a different network or VPN

### Best Practices

1. **Content Quality**: Write clear, engaging openings for better AI responses
2. **Length Management**: Keep initial content between 100-500 characters for optimal results
3. **Iterative Approach**: Generate endings frequently to maintain story coherence
4. **Backup**: Copy your content regularly to avoid losing work
5. **Experimentation**: Try different models and lengths to find your preferred style

### Performance Tips

1. **Shorter Prompts**: Longer initial content may slow down generation
2. **Model Selection**: `gpt-3.5-turbo` is faster than `gpt-4`
3. **Batch Generation**: Generate multiple endings at once rather than one by one
4. **Browser Cache**: Clear browser cache if experiencing slow loading

## Creative Writing Tips

### Effective Story Beginnings

**Good examples:**
- Establish setting and character quickly
- Introduce conflict or mystery early
- Use descriptive language to create atmosphere
- End with a hook that invites continuation

**Example templates:**
- "在一个[地点]，[角色]发现了[神秘事物]..."
- "[角色]没有想到，[事件]会改变他的一生..."
- "当[角色]走进[地点]时，[意外事件]发生了..."

### Using Generated Endings Effectively

1. **Contrast**: Choose endings that create interesting contrasts with your setup
2. **Character Development**: Select endings that reveal character depth
3. **Plot Advancement**: Pick endings that move the story forward meaningfully
4. **Emotional Impact**: Consider the emotional resonance of each ending

### Building Complex Narratives

1. **Branching Stories**: Use different endings to explore alternative plot lines
2. **Character Arcs**: Develop characters through multiple continuation cycles
3. **World Building**: Expand your fictional world with each continuation
4. **Thematic Consistency**: Maintain consistent themes throughout your story

Happy writing! 🎭✨