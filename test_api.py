#!/usr/bin/env python3
"""
Simple test script to demonstrate the AI Novel Continuation API
This script tests the backend API without requiring the frontend.
"""

import requests
import json
import os
from typing import Dict, Any

# Configuration
API_BASE_URL = "http://localhost:5000/api/v1"
TEST_API_KEY = os.getenv("OPENAI_API_KEY", "sk-test-key")
TEST_BASE_URL = "https://api.openai.com/v1"
TEST_MODEL = "gpt-3.5-turbo"

def test_api_configuration() -> bool:
    """Test API configuration endpoint"""
    print("🔧 Testing API Configuration...")
    
    url = f"{API_BASE_URL}/openaiapi"
    payload = {
        "apiKey": TEST_API_KEY,
        "baseUrl": TEST_BASE_URL,
        "model": TEST_MODEL
    }
    
    try:
        response = requests.post(url, json=payload)
        if response.status_code == 200:
            print("✅ API Configuration successful!")
            return True
        else:
            print(f"❌ API Configuration failed: {response.json()}")
            return False
    except Exception as e:
        print(f"❌ Error during API configuration: {e}")
        return False

def test_endings_generation() -> list:
    """Test endings generation endpoint"""
    print("\n📝 Testing Endings Generation...")
    
    url = f"{API_BASE_URL}/novel/endings"
    test_content = """在一个充满魔法的古老王国里，年轻的法师艾米丽发现了一个神秘的预言。
预言说，只有找到失落的光明法杖，才能拯救即将被黑暗吞噬的王国。
艾米丽决定踏上这个危险的旅程，但她不知道前方等待着她的是什么..."""
    
    payload = {"content": test_content}
    
    try:
        response = requests.post(url, json=payload)
        if response.status_code == 200:
            data = response.json()
            endings = data.get("endings", [])
            print(f"✅ Generated {len(endings)} endings:")
            for i, ending in enumerate(endings, 1):
                print(f"   {i}. {ending}")
            return endings
        else:
            print(f"❌ Endings generation failed: {response.json()}")
            return []
    except Exception as e:
        print(f"❌ Error during endings generation: {e}")
        return []

def test_novel_continuation(selected_ending: str) -> str:
    """Test novel continuation endpoint"""
    print("\n✍️ Testing Novel Continuation...")
    
    url = f"{API_BASE_URL}/novel/continue"
    test_content = """在一个充满魔法的古老王国里，年轻的法师艾米丽发现了一个神秘的预言。
预言说，只有找到失落的光明法杖，才能拯救即将被黑暗吞噬的王国。
艾米丽决定踏上这个危险的旅程，但她不知道前方等待着她的是什么..."""
    
    payload = {
        "content": test_content,
        "ending": selected_ending,
        "maxLength": 500
    }
    
    try:
        response = requests.post(url, json=payload)
        if response.status_code == 200:
            data = response.json()
            continuation = data.get("novel", "")
            print("✅ Generated continuation:")
            print(f"   {continuation}")
            return continuation
        else:
            print(f"❌ Novel continuation failed: {response.json()}")
            return ""
    except Exception as e:
        print(f"❌ Error during novel continuation: {e}")
        return ""

def test_error_handling():
    """Test error handling scenarios"""
    print("\n🚨 Testing Error Handling...")
    
    # Test missing content
    print("Testing missing content...")
    url = f"{API_BASE_URL}/novel/endings"
    response = requests.post(url, json={})
    if response.status_code == 400:
        print("✅ Correctly handled missing content error")
    else:
        print("❌ Did not handle missing content error correctly")
    
    # Test unconfigured API
    print("Testing unconfigured API...")
    # This would require a fresh session, so we'll skip for now
    print("⏭️ Skipping unconfigured API test (requires fresh session)")

def main():
    """Main test function"""
    print("🎭 AI Novel Continuation API Test Suite")
    print("=" * 50)
    
    # Test 1: API Configuration
    config_success = test_api_configuration()
    if not config_success:
        print("❌ API configuration failed. Please check your OpenAI API key.")
        print("   Set OPENAI_API_KEY environment variable or update the script.")
        return
    
    # Test 2: Endings Generation
    endings = test_endings_generation()
    if not endings:
        print("❌ Could not generate endings. Tests cannot continue.")
        return
    
    # Test 3: Novel Continuation
    selected_ending = endings[0]  # Use first ending for testing
    print(f"\n🎯 Selected ending for continuation: {selected_ending}")
    continuation = test_novel_continuation(selected_ending)
    if not continuation:
        print("❌ Could not generate continuation.")
        return
    
    # Test 4: Error Handling
    test_error_handling()
    
    print("\n" + "=" * 50)
    print("🎉 Test suite completed!")
    print("\n📊 Test Results Summary:")
    print("✅ API Configuration: Success")
    print("✅ Endings Generation: Success")
    print("✅ Novel Continuation: Success")
    print("✅ Error Handling: Tested")
    
    print("\n💡 Full Example Story:")
    print("Original:")
    print("在一个充满魔法的古老王国里，年轻的法师艾米丽发现了一个神秘的预言...")
    print(f"\nSelected Ending:")
    print(selected_ending)
    print(f"\nGenerated Continuation:")
    print(continuation)

if __name__ == "__main__":
    main()