import os

from flask import Flask, request, jsonify, session, json
import openai


app = Flask(__name__)
app.secret_key = os.urandom(24)

@app.route('/api/v1/openaiapi', methods=['POST'])
def set_openai_api_key():
    data = request.get_json()
    if not data or 'apiKey' not in data or 'baseUrl' not in data or 'model' not in data:
        return jsonify({'status':'error', 'message':'参数不能为空'}), 400

    session['api_key'] = data['apiKey']
    session['baseUrl'] = data['baseUrl']
    session['model'] = data['model']

    try:
        client = openai.OpenAI(
            base_url=session['baseUrl'],
            api_key=session['api_key'],
        )
        # Attempt to list models to verify the connection and credentials
        client.models.list()
        return jsonify({'status': 'success'}), 200
    except Exception as e:
        print(f"Error testing OpenAI connection: {e}")
        return jsonify({'status': 'error', 'message': '无效的 OpenAI API 配置。请检查 baseUrl、model 和 apiKey 是否正确。'}), 400

@app.route('/api/v1/novel/endings', methods=['POST'])
def generate_novel_endings():
    data = request.get_json()
    if not data or 'content' not in data:
        return jsonify({'status':'error','message':'内容不能为空或格式不正确。请提供有效的小说内容。'}), 400

    if 'api_key' not in session or 'baseUrl' not in session or 'model' not in session:
        return jsonify({'status':'error','message':'未配置 OpenAI API'}), 401

    api_key = session.get('api_key')
    base_url = session.get('baseUrl')
    model = session.get('model')

    prompt_instructions = """请为以上文本生成4个不同的结局。每个结局都应有独特的情节和风格。
    请将生成的4个结局组织成一个JSON对象。该JSON对象应包含一个名为 "endings" 的键，其值为一个包含4个结局字符串的列表。
    请确保你的回答只包含这个JSON对象，没有任何其他文字或解释。

    输出的JSON格式应严格如下（其中的结局文本会根据你的创作而变化）：
    {
        "endings": [
            "罗兰举起银色法杖，点亮夜空，将园中黑影驱散，魔法国度重现生机。",
            "彼岸花凋零之际，少女献出一滴泪水，唤回沉睡的灵魂，花园得以重生。",
            "寒风中，骑士踏碎魔镜，以血肉之躯封印黑暗，王国迎来久违的曙光。",
            "吟游诗人轻吟旧曲，旋律化为暖流，抚慰受伤心灵，爱与希望蔓延四方。"
        ]
    }
    """

    full_prompt = data['content'] + prompt_instructions

    try:
        client = openai.OpenAI(base_url=base_url, api_key=api_key)

        print('正在生成结局...')
        response = client.responses.create(
            model=model,
            input=full_prompt,
        )
        print('结局生成完成！')

        raw_json_output = response.output_text.strip()
        parsed_data = json.loads(raw_json_output)
        return jsonify(parsed_data), 200
    except Exception as e:
        return jsonify({'status':'error','message':'生成出错！请检查 OpenAI API 配置并重试。'}), 500

@app.route('/api/v1/novel/continue', methods=['POST'])
def generate_novel_continue():
    data = request.get_json()
    if not data or 'content' not in data or 'ending' not in data or 'maxLength' not in data:
        return jsonify({'status':'error','message':'内容、结局或最大长度参数不正确。请确保提供有效的小说内容、结局和最大长度。'}), 400

    if 'api_key' not in session or 'baseUrl' not in session or 'model' not in session:
        return jsonify({'status':'error','message':'未配置 OpenAI API'}), 401

    api_key = session.get('api_key')
    base_url = session.get('baseUrl')
    model = session.get('model')

    prompt_instructions = f"""请根据以上文本和结局，生成一个完整的小说段落。请确保段落自然流畅，并且与提供的结局相符。字数约为{data['maxLength']}字。"""
    full_prompt = '文本:' + data['content'] + '\n' + '结局' + data['ending'] + '\n' + prompt_instructions

    try:
        client = openai.OpenAI(base_url=base_url, api_key=api_key)

        print('正在生成小说段落...')
        response = client.responses.create(
            model=model,
            input=full_prompt,
        )
        print('小说段落生成完成！')

        generated_text = response.output_text.strip()
        return jsonify({'novel': generated_text}), 200
    except:
        return jsonify({'status':'error','message':'生成出错！请检查 OpenAI API 配置并重试。'}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0')
